import argparse
import datetime
import hashlib
import os
import platform
import stat
import subprocess
import sys
import urllib.request

import yaml
from jinja2 import Environment, FileSystemLoader

DATA_DIR = 'assets/data'
TEMPLATE_DIR = 'assets'
OUTPUT = 'index.html'

# Tailwind standalone CLI (no Node needed). Downloaded on first build into .bin/ and verified by checksum.
TAILWIND_VERSION = '3.4.17'
TAILWIND_SHA256 = {
    'linux-arm64': '69b1378b8133192d7d2feb12a116fa12d035594f58db3eff215879e4ad8cf39b',
    'linux-x64': '7d24f7fa191d2193b78cd5f5a42a6093e14409521908529f42d80b11fde1f1d4',
    'macos-arm64': 'a1d0c7985759accca0bf12e51ac1dcbf0f6cf2fffb62e6e0f62d091c477a10a3',
    'macos-x64': '6cbdad74be776c087ffa5e9a057512c54898f9fe8828d3362212dfe32fc933a3',
    'windows-arm64.exe': '76f516476784c00f1562160b5758e3d8f0e6c48957efb26b5b50fbdfd76aa382',
    'windows-x64.exe': '67f1c5e3f5a03406a7bf5badf5ada09b79f3ae78ec43450c15f7e983068da346',
}
CSS_INPUT = 'assets/tailwind.css'
CSS_OUTPUT = 'assets/site.css'

# Paths staged by --msg. Anything else (venvs, editor files, logs) is left alone.
GIT_PATHS = ['index.html', 'build.py', 'README.md', 'requirements.txt', '.gitignore', 'assets', 'images']


def load_data():
    data = {}
    for filename in sorted(os.listdir(DATA_DIR)):
        if not filename.endswith(('.yaml', '.yml')):
            continue
        with open(os.path.join(DATA_DIR, filename), 'r', encoding='utf-8') as file:
            file_data = yaml.safe_load(file) or {}
        for key in file_data:
            if key in data:
                sys.exit(f"Error: top-level key '{key}' in {filename} is already defined in another data file")
        data.update(file_data)
    return data


def check_local_files(data):
    """Fail the build if any referenced local image/asset is missing."""
    missing = []

    def walk(value):
        if isinstance(value, dict):
            for v in value.values():
                walk(v)
        elif isinstance(value, list):
            for v in value:
                walk(v)
        elif isinstance(value, str) and value.startswith(('images/', 'assets/')) and not os.path.exists(value):
            missing.append(value)

    walk(data)
    if missing:
        sys.exit("Error: referenced files not found:\n  " + "\n  ".join(missing))


def tailwind_binary():
    system = {'Darwin': 'macos', 'Linux': 'linux', 'Windows': 'windows'}.get(platform.system())
    arch = {'arm64': 'arm64', 'aarch64': 'arm64', 'x86_64': 'x64', 'AMD64': 'x64'}.get(platform.machine())
    target = f"{system}-{arch}" + ('.exe' if system == 'windows' else '')
    if target not in TAILWIND_SHA256:
        sys.exit(f"Error: no Tailwind binary for {platform.system()} {platform.machine()}")

    path = os.path.join('.bin', f"tailwindcss-{TAILWIND_VERSION}-{target}")
    if not os.path.exists(path):
        url = f"https://github.com/tailwindlabs/tailwindcss/releases/download/v{TAILWIND_VERSION}/tailwindcss-{target}"
        print(f"Downloading Tailwind CLI v{TAILWIND_VERSION}...")
        with urllib.request.urlopen(url) as response:
            binary = response.read()
        if hashlib.sha256(binary).hexdigest() != TAILWIND_SHA256[target]:
            sys.exit("Error: Tailwind CLI checksum mismatch, refusing to use it")
        os.makedirs('.bin', exist_ok=True)
        with open(path, 'wb') as file:
            file.write(binary)
        os.chmod(path, os.stat(path).st_mode | stat.S_IEXEC)
    return path


def build_css():
    subprocess.run([tailwind_binary(), '-i', CSS_INPUT, '-o', CSS_OUTPUT, '--content', OUTPUT, '--minify'],
                   check=True, stderr=subprocess.DEVNULL)
    print(f"Successfully built {CSS_OUTPUT}")


def build():
    data = load_data()
    check_local_files(data)

    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR), autoescape=True)
    template = env.get_template('template.html')
    rendered_html = template.render(**data, build_year=datetime.date.today().year)

    with open(OUTPUT, 'w', encoding='utf-8') as file:
        file.write(rendered_html)

    print(f"Successfully built {OUTPUT} from data files")

    build_css()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Build the portfolio website.")
    parser.add_argument('-m', '--msg', type=str, help="Commit message for git. If provided, will automatically commit and push.", default=None)
    args = parser.parse_args()

    build()

    if args.msg:
        print(f"Committing and pushing with message: '{args.msg}'")
        try:
            subprocess.run(['git', 'add', '--', *GIT_PATHS], check=True)
            subprocess.run(['git', 'commit', '-m', args.msg], check=True)
            subprocess.run(['git', 'push'], check=True)
            print("Successfully pushed to git.")
        except subprocess.CalledProcessError as e:
            sys.exit(f"Error during git operations: {e}")
