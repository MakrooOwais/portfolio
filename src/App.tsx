import React from "react";
import { motion } from "motion/react";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  ExternalLink,
  BookOpen,
  Briefcase,
  Code,
  Star,
  User,
  ChevronRight,
  GitBranch,
  Award
} from "lucide-react";

const personalInfo = {
  name: "Owais Makroo",
  email: "makroo.owais@gmail.com",
  location: "Srinagar, Jammu & Kashmir, India"
};

const publications = [
  {
    title: "SALSA: A Secure, Adaptive and Label-Agnostic Scalable Algorithm for Machine Unlearning",
    venue: "UAI 2025",
    link: "https://proceedings.mlr.press/v286/makroo25a.html"
  },
  {
    title: "The Hidden Cost of Modeling p(x): Vulnerability to Membership Inference Attacks in Generative Text Classifiers",
    venue: "NeurIPS 2025 Workshop",
    link: "https://openreview.net/pdf?id=MNVmoRKWae"
  },
  {
    title: "Enhanced Identification of Pheochromocytoma and Paragangliomas' Genetic Clusters from CT",
    venue: "SPIE Medical Imaging 2025",
    link: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13407/134071B/Enhanced-identification-of-pheochromocytoma-and-paragangliomas-genetic-clusters-from-CT/10.1117/12.3047387.full"
  },
  {
    title: "ReSuMe: Retriever-Summarizer Mutual Enhancement via Reinforcement Learning",
    venue: "WWW 2026"
  },
  {
    title: "The Hidden Cost of Modeling p(x): Vulnerability to Membership Inference Attacks in Generative Text Classifiers",
    venue: " Transactions on Machine Learning Research (TMLR, Under Review)",
    link: "https://arxiv.org/html/2510.16122v1"

  },
  {
    title: "Detecting Dataset Outliers via Training Dynamics Clustering",
    venue: "UAI 2026 (Under Review)"
  },
  {
    title: "Multi-Headed Deep Feature Learning for Genetic Clusters Identification from CT",
    venue: "Biomedical Signal Processing & Control (Under Review)"
  }
];

const projects = [
  {
    title: "SIREN – Explainable AI Framework",
    description:
      "Gold Medal at InterIIT Tech Meet. Built an interpretability framework for detecting AI-generated images and explaining model decisions.",
    github: "https://github.com/MakrooOwais/SIREN"
  }, {
    title: "SALSA Unlearning Library",
    description:
      "A unified framework for machine unlearning, supporting SALSA and multiple SOTA baselines with built-in evaluation.",
    github: "https://github.com/your-username/salsa-unlearn"
  },
  {
    title: "TorchOptimizer",
    description:
      "Parallel Bayesian Optimization framework for PyTorch Lightning models.",
    github: "https://github.com/MakrooOwais/TorchOptimizer"
  },
  {
    title: "PyPopSim – Population Simulator",
    description:
      "Stochastic ecological simulator implementing logistic, predator-prey, and exponential growth models.",
    github: "https://github.com/MakrooOwais/PyPopSim"
  }
];

const repos = [
  {
    name: "LoRA-ViT-Pipeline",
    description: "Lightweight adaptation framework for Vision Transformers using Low-Rank Adaptation (LoRA), with dedicated training and multi-adapter inference pipelines for efficient task switching.",
    url: "https://github.com/MakrooOwais/LoRA-ViT-Pipeline"
  },
  {
    name: "UNet-Road-Segmentation",
    description: "UNet-based semantic road segmentation implemented with PyTorch Lightning using an encoder-decoder architecture with skip connections and Dice/accuracy evaluation.",
    url: "https://github.com/MakrooOwais/UNET_Road_Segmentation"
  },
];

const extracurriculars = [
  {
    title: "Strength & Athletics",
    description:
      "Weightlifting and throwing events for IIT Kharagpur. Discipline in the gym translates to discipline in research.",
    image: "/extras/lifting.jpg"
  },
  {
    title: "Mountains & Water",
    description:
      "Hiking, trekking, climbing, swimming, kayaking. The outdoors recalibrates my brain.",
    image: "/extras/hiking.jpg"
  },
  {
    title: "Creative Work",
    description:
      "Drawing and reading. I like long-form thinking and quiet focus.",
    image: "/extras/drawing.jpg"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400">

      {/* HERO */}
      <header className="relative min-h-[95vh] flex items-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundPosition: "center"
          }}
        ></div>

        <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-light text-white">
            Owais Makroo
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed">
            I build AI systems that live between clean math and messy production, thinking about privacy, robustness, machine unlearning, and training dynamics and am  about to join Amazon as an Applied Scientist.
            And when I’m not working, I’m usually running, lifting, climbing, or chasing some other difficult thing on purpose.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono">
            <a href={`mailto:${personalInfo.email}`} className="px-4 py-2 border border-white/10 rounded-full hover:text-blue-400">
              Email
            </a>
            <a href="https://linkedin.com/in/makroo-owais" target="_blank" className="px-4 py-2 border border-white/10 rounded-full hover:text-blue-400">
              LinkedIn
            </a>
            <a href="https://github.com/MakrooOwais" target="_blank" className="px-4 py-2 border border-white/10 rounded-full hover:text-blue-400">
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-24 space-y-28">

        {/* RESEARCH */}
        <section>
          <h2 className="text-4xl text-white mb-10 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-400" />
            Research
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {publications.map((paper, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-400/40 transition">
                <h3 className="text-zinc-200 font-medium">{paper.title}</h3>
                <p className="text-sm text-blue-400 mt-2">{paper.venue}</p>
                {paper.link && (
                  <a
                    href={paper.link}
                    target="_blank"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-blue-400"
                  >
                    <ExternalLink className="w-4 h-4" /> View Paper
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <h2 className="text-4xl text-white mb-4 flex items-center gap-3">
            <Code className="w-6 h-6 text-blue-400" />
            Things I’ve Built
          </h2>

          <p className="text-zinc-400 mb-10 max-w-2xl">
            Research papers are ideas. These are implementations.
            I like building systems that actually run.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-400/40 transition group">
                <h3 className="text-zinc-200 font-medium text-lg">
                  {proj.title}
                </h3>

                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  {proj.description}
                </p>

                <a
                  href={proj.github}
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* SELECTED REPOSITORIES */}
        <section>
          <h2 className="text-4xl text-white mb-4 flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-blue-400" />
            Selected Repositories
          </h2>

          <p className="text-zinc-400 mb-10 max-w-2xl">
            Smaller experiments, side explorations, and things I built while thinking.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {repos.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-400/40 transition block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="w-4 h-4 text-blue-400" />
                  <h3 className="text-zinc-200 font-medium">
                    {repo.name}
                  </h3>
                </div>

                <p className="text-sm text-zinc-400">
                  {repo.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* EXTRACURRICULARS WITH IMAGES */}
        <section>
          <h2 className="text-4xl text-white mb-10 flex items-center gap-3">
            <User className="w-6 h-6 text-blue-400" />
            Beyond Research
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {extracurriculars.map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="text-zinc-200 font-medium">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 py-12 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} Owais Makroo
      </footer>
    </div>
  );
}