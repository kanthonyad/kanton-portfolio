import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Mail, 
  Linkedin, 
  Instagram, 
  ArrowUpRight, 
  Maximize2
} from 'lucide-react';

/**
 * Kanton. - Advertising Portfolio for Kyle Anthony
 * Optimized for high-impact visual storytelling and supporting multiple video assets.
 */

// --- Helper Functions ---
const isVideo = (url) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0].split('#')[0];
  return /\.(mp4|webm|ogg)$/i.test(cleanUrl) || cleanUrl.includes('adobe.com') || cleanUrl.includes('cloudinary.com/video');
};

const isGif = (url) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0].split('#')[0];
  return cleanUrl.toLowerCase().endsWith('.gif');
};

// --- Mock Data ---
const PROJECTS = [
  {
    id: 1,
    title: "A Chiefs Love Story",
    client: "Kansas City Chiefs",
    category: "Fan Engagement",
    heroImage: "./images/ChiefsLoveStory.gif",
    primaryMedia: "https://res.cloudinary.com/drmuuarxv/video/upload/v1766375412/ChiefsLoveStory_CaseStudy_jl6j7p.mp4",  
    gallery: [
       "./images/Chiefs_Add_1.png",
       "./images/Chiefs_Add_2.png"
    ],
    strategy: "The Kansas City Chiefs wanted to turn casual fans to lifelong fans. We made a spoof trailer for a Hallmark made for TV movie. Then things got our of control.",
    results: "10.2B Organic Impressions. Then, our trailer turned into the most watched cable movie of the year.",
    credits: "AD: Kyle Anthony / CW: Deidre Lichty / Director: Parker Seaman / Production: Lord Danger",
    tags: ["3x Clio", "Cannes Lions Shortlist"]
  },
  {
    id: 2,
    title: "1, 2, 3, Floor",
    client: "LL Flooring",
    category: "Video",
    heroImage: "./images/LLFlooring.gif",
    primaryMedia: "https://res.cloudinary.com/drmuuarxv/video/upload/v1767053248/LLFLOORINGNOWWHAT_30_wdc1h3.mp4",
    gallery: [
      "https://res.cloudinary.com/drmuuarxv/video/upload/v1767053370/LLFLOORING123FLOOR_30_q8sgjo.mp4"
    ],
    strategy: "LL Flooring wanted to be known for their flooring expertise and specialized customer service.",
    results: "We made up these spots and their new customer journey we called 1,2,3, Floor.",
    credits: "AD: Kyle Anthony / CW: Deidre Lichty / Director: Adam Patch / Production: Stept",
    tags: []
  },
  {
    id: 3,
    title: "Any Reason Is A Good Reason",
    client: "The Salvation Army",
    category: "Video",
    heroImage: "./images/TSA_OneUp.gif",
    primaryMedia: "https://res.cloudinary.com/drmuuarxv/video/upload/v1767054497/TSA_ONEUP_60_dvv0dv.mp4",
    gallery: [
      "https://res.cloudinary.com/drmuuarxv/video/upload/v1767067594/TSA_LIKESHARE_30_ndki1p.mp4"
    ],
    strategy: "No matter the reason for donating or shopping at a thrift store — from altruistic to silly — you’re amplifying the good when you do it at The Salvation Army Thrift Store.",
    results: "The films draw viewers in with light humor before grounding them with raw drama and emotional stakes.",
    credits: "AD: Kyle Anthony / CW: Deidre Lichty / Director: Marek Partys / Production: Spark & Riot",
    tags: ["AdAge", "LBB", "Ads of the World"]
  },
  {
    id: 4,
    title: "The 3-Pete",
    client: "Kansas City Chiefs",
    category: "Fan Engagement",
    heroImage: "./images/CHIEFS_3PETE.gif",
    primaryMedia: "https://res.cloudinary.com/drmuuarxv/video/upload/v1767065955/CHIEFS_MAGIC_NUMBER_aiqcuh.mp4",
    gallery: [
      "./images/CHIEFS_3PETE_1.png",
      "./images/CHIEFS_3PETE_2.png"
    ],
    strategy: "In 2025 the Kansas City Chiefs were on their way to their third Super Bowl. A feat so rare, there’s a name for it. There’s just one problem. The name is copyrighted. So how did we hype fans up for a three **** without saying three ****?",
    results: "22 million earned impressions and $10.7 million in earned media.",
    credits: "AD: Kyle Anthony / CW: Deidre Lichty / Director: Parker Seaman / Production: Lord Danger",
    tags: ["Clio Silver"]
  },
  {
    id: 5,
    title: "Mission Mixtape",
    client: "Dairy Queen",
    category: "Social Activation",
    heroImage: "./images/DQ_MISSION_MIXTAPE.gif",
    primaryMedia: "https://res.cloudinary.com/drmuuarxv/video/upload/v1767149357/DQ_MISSIONMIXTAPE_rfyf4m.mp4",
    gallery: [
      "./images/MissionMixTape.jpg",
      "./images/GOTG_PressOneSheet_Walkman.png"
    ],
    strategy: "When DQ teamed up with Marvel's Guardians of the Galaxy Vol. 2, we teamed up with some nostalgic technology to create the #MissionMixtape sweepstakes. Fans had a chance to claim one of 1,000 exclusive mixtapes inspired by the movie's “Awesome Mix”. Then they faced the real challenge: finding a cassette player to listen to the mixtape to win prizes ranging from DQ gift cards to signed movie posters.",
    results: "1,000 mixtapes sold out in 3 minutes. 39 million impressions. 9 million Blizzards sold. 1 galaxy guarded.",
    credits: "AD: Kyle Anthony / CW: Joe DeSalvo / Design: Jen Beck / Music: Primary Colors",
    tags: []
  },
{
    id: 6,
    title: "Unfinished Legacies",
    client: "Kansas City",
    category: "Social Influencer",
    heroImage: "./images/UL.gif",
    primaryMedia: "https://res.cloudinary.com/drmuuarxv/video/upload/v1767200184/UNFINISHED_LEGACIES_pdkl5c.mp4",
    gallery: [
      "./images/UL_1.png",
      "./images/UL_2.png",
      "https://res.cloudinary.com/drmuuarxv/video/upload/v1767200199/UL_JORDAN_wylyej.mp4"
    ],
    strategy: "In 2023 the Kansas City metro was in the middle of a fentanyl crisis, with overdose deaths climbing 1200% since 2019. The mayor asked us to create a campaign that would break through to the most at risk population – men aged18-29 who thought that the fentanyl crisis couldn't reach them. So we created an influencer campaign featuring peers who have personal experience from an accidental lethal fentanyl overdose.",
    results: "15 million earned impressions. A drop in fentanyl deaths city-wide",
    credits: "AD: Kyle Anthony / CW: Deidre Lichty / Director: Brady Cackler / Production: Barkley Films",
    tags: []
  },
];

const MARQUEE_IMAGES = [
  "./images/Marquee1.png",
  "./images/Marquee2.png",
  "./images/Marquee3.png",
  "./images/Marquee4.png",
  "./images/Marquee5.png",
  "./images/Marquee6.png",
  "./images/Marquee7.png",
  "./images/Marquee1.png",
];

// --- Sub-components ---

const MediaRenderer = ({ url, className = "", forceContain = false }) => {
  if (isVideo(url)) {
    return (
      <div className={`relative w-full aspect-video bg-black ${className}`}>
        <video 
          src={url} 
          className={`w-full h-full ${forceContain ? 'object-contain' : 'object-cover'}`} 
          controls 
          autoPlay 
          muted
          loop
          playsInline
        />
      </div>
    );
  }
  
  if (isGif(url)) {
    return (
      <img 
        src={url} 
        className={`w-full h-auto block object-cover ${className}`} 
        alt="Motion Asset" 
      />
    );
  }

  return (
    <img 
      src={url} 
      alt="Gallery Media" 
      className={`w-full h-auto block object-cover ${className}`}
    />
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-8 lg:p-12 bg-[#0F172A]/98 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 md:top-10 md:right-10 p-4 bg-white text-[#0F172A] rounded-full hover:bg-[#A855F7] hover:text-white transition-all z-[120] shadow-2xl group"
        aria-label="Close Modal"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <div 
        className="relative w-full max-w-7xl bg-[#1E293B] rounded-3xl shadow-2xl border border-white/10 animate-in zoom-in slide-in-from-bottom-4 duration-500 overflow-visible my-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex flex-col lg:flex-row w-full min-h-full">
          {/* Visual Column */}
          <div className="w-full lg:w-3/5 bg-black flex flex-col min-h-[300px]">
            <div className="w-full bg-[#0F172A] flex items-center justify-center">
              <MediaRenderer url={project.primaryMedia} />
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-px w-full bg-[#0F172A] border-t border-white/5">
                {project.gallery.map((item, index) => {
                  const isVid = isVideo(item);
                  return (
                    <div 
                      key={index} 
                      className={`w-full bg-slate-900 flex items-center justify-center overflow-hidden 
                        ${isVid ? 'col-span-full aspect-video' : 'aspect-video md:aspect-square'}`}
                    >
                      <MediaRenderer 
                        url={item} 
                        className="h-full w-full" 
                        forceContain={isVid}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sticky Project Info Column */}
          <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-start bg-[#1E293B] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
            <div className="max-w-xl">
              <span className="text-[#22D3EE] font-mono text-sm tracking-widest uppercase mb-4 block">
                {project.client} — {project.category}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold font-serif text-white mb-10 leading-tight">
                {project.title}
              </h2>
              
              <div className="space-y-12">
                <section>
                  <h4 className="text-[#A855F7] font-mono text-xs uppercase tracking-tighter mb-4 border-l-2 border-[#A855F7] pl-5">The Strategy</h4>
                  <p className="text-slate-300 leading-relaxed text-lg md:text-xl">
                    {project.strategy}
                  </p>
                </section>

                <section>
                  <h4 className="text-[#A855F7] font-mono text-xs uppercase tracking-tighter mb-4 border-l-2 border-[#A855F7] pl-5">The Results</h4>
                  <p className="text-slate-300 leading-relaxed text-lg md:text-xl">
                    {project.results}
                  </p>
                </section>

                {project.credits && (
                  <section>
                    <h4 className="text-[#A855F7] font-mono text-xs uppercase tracking-tighter mb-4 border-l-2 border-[#A855F7] pl-5">Credits</h4>
                    <ul className="space-y-2 text-slate-400 font-mono text-sm leading-relaxed uppercase tracking-wider">
                      {project.credits.split('/').map((credit, i) => (
                        <li key={i}>{credit.trim()}</li>
                      ))}
                    </ul>
                  </section>
                )}

                <div className="pt-8">
                  <div className="flex flex-wrap gap-3 mb-12">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-[#0F172A] text-slate-400 text-[11px] font-mono rounded-full uppercase tracking-widest border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={onClose}
                    className="w-full py-5 bg-white text-[#0F172A] font-mono text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-[#22D3EE] transition-all"
                  >
                    Return to Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  return (
    <div id="home" className="min-h-screen bg-[#0F172A] text-slate-100 selection:bg-[#A855F7] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Roboto+Mono:wght@300;400;500;700;900&display=swap');
        
        :root {
          --scroll-y: 0px;
        }

        body {
          font-family: 'Alegreya', serif;
        }
        .font-mono {
          font-family: 'Roboto Mono', monospace;
        }
        
        .parallax-bg {
          transform: translateY(calc(var(--scroll-y) * 0.2));
          will-change: transform;
        }
        .parallax-text {
          transform: translateY(calc(var(--scroll-y) * -0.1));
          will-change: transform;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 md:px-12 flex justify-between items-center bg-[#0F172A]/90 backdrop-blur-md border-b border-white/5">
        <a href="#home" className="group">
          <h1 className="text-3xl font-black text-[#A855F7] uppercase transition-colors duration-300 group-hover:text-white font-mono">
           Pretty<span className="text-white transition-colors duration-300 group-hover:text-[#A855F7]">.</span>Good
          </h1>
        </a>
        <div className="hidden md:flex space-x-8 font-mono text-sm uppercase tracking-widest text-white">
          <a href="#work" className="hover:text-[#22D3EE] transition-colors">Work</a>
          <a href="#about" className="hover:text-[#22D3EE] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#22D3EE] transition-colors">Contact</a>
        </div>
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0F172A] z-[60] flex flex-col items-center justify-center space-y-8 font-serif text-5xl text-white animate-in slide-in-from-right duration-300">
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home.</a>
          <a href="#work" onClick={() => setIsMenuOpen(false)}>Work.</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About.</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact.</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="parallax-bg absolute top-[-10%] left-[-5%] w-[110%] h-[120%] bg-gradient-to-br from-[#A855F7]/10 via-transparent to-[#22D3EE]/10 opacity-40 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20 animate-pulse pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-6xl w-full text-center md:text-left">
          <p className="font-mono text-[#22D3EE] text-sm uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-bottom duration-700">
            Portfolio Vol. 20
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] text-white tracking-tight animate-in fade-in slide-in-from-bottom duration-1000 delay-150">
            Kyle Anthony is a <span className="text-[#A855F7]"> pretty good art director </span>and also <span className="text-[#22D3EE]">pretty good at writing</span> and also <span className="text-[#A855F7]">pretty humble,</span> too.
          </h2>
          
          <div className="mt-12 flex flex-col md:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <a 
              href="#work" 
              className="px-10 py-4 bg-white text-[#0F172A] font-mono text-sm uppercase tracking-widest font-bold rounded-full hover:bg-[#22D3EE] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              See the goods
              <Maximize2 size={18} className="group-hover:rotate-90 transition-transform" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Project Gallery */}
      <section id="work" className="py-24 px-6 md:px-12 bg-white text-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h3 className="text-4xl md:text-6xl font-normal tracking-tighter leading-[0.9]">Selected Work.</h3>
            <span className="font-mono text-xs uppercase tracking-widest border-b border-[#0F172A] pb-1">
              (2022 — 2024)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {PROJECTS.map((project, idx) => (
              <div 
                key={project.id} 
                className={`group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 mb-8 rounded-sm">
                  <img 
                    src={project.heroImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#A855F7]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Maximize2 size={24} className="text-[#A855F7]" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 block">
                      {project.client} / {project.category}
                    </span>
                    <h4 className="text-3xl font-bold group-hover:text-[#A855F7] transition-colors">
                      {project.title}
                    </h4>
                  </div>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee - Now using square dimensions to match gallery thumbnails */}
      <section className="py-8 bg-white overflow-hidden whitespace-nowrap border-y border-slate-100">
        <div className="animate-marquee flex gap-4">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-4">
              {MARQUEE_IMAGES.map((img, idx) => (
                <div 
                  key={`${groupIdx}-${idx}`} 
                  className="h-[280px] aspect-square flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500"
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                    alt={`Gallery scroll ${idx}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1E293B]/30 -skew-x-12 translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="sticky top-32">
                <span className="font-mono text-[#22D3EE] text-xs uppercase tracking-widest block mb-4">The Headshot</span>
                <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden mb-6 border border-white/10 flex items-center justify-center text-slate-500">
                  <img 
                    src="./images/Profile.png" 
                    alt="Headshot" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-8 space-y-8">
             {/*  <h3 className="text-4xl md:text-6xl font-normal tracking-tighter leading-[0.9]">
                I make<span className="text-slate-500 font-normal"> (pretty good)</span> things.
              </h3> */}
              <p className="text-1xl md:text-2xl text-slate-300 font-serif leading-relaxed">
                Kyle Anthony is an Alaskan educated in Colorado living in Missouri in the city of Kansas.
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-[#22D3EE] text-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-normal tracking-tighter leading-[0.9] mb-8">
                Get In Touch.
              </h3>
              
              <div className="flex flex-row gap-4 pt-4">
                <a href="mailto:kanthony.ad@gmail.com" className="p-3 border border-[#0F172A]/20 rounded-full hover:bg-[#0F172A] hover:text-white transition-all">
                  <Mail size={24} />
                </a>
                <a href="https://www.linkedin.com/in/propaganic/" target="_blank" className="p-3 border border-[#0F172A]/20 rounded-full hover:bg-[#0F172A] hover:text-white transition-all">
                  <Linkedin size={24} />
                </a>
                <a href="https://www.instagram.com/thefakekyleanthony/" target="_blank" className="p-3 border border-[#0F172A]/20 rounded-full hover:bg-[#0F172A] hover:text-white transition-all">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            <div className="bg-[#0F172A] p-8 md:p-12 rounded-3xl text-white shadow-2xl">
              {formStatus === 'success' ? (
                <div className="h-80 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in">
                  <div className="w-20 h-20 bg-[#A855F7] rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-ping" />
                  </div>
                  <h4 className="text-3xl font-bold">Message Dispatched.</h4>
                  <p className="font-mono text-sm text-slate-400">I'll get back to you faster than a client feedback loop.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-[#A855F7] outline-none transition-colors placeholder:text-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@studio.com"
                        className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-[#A855F7] outline-none transition-colors placeholder:text-slate-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Your Message</label>
                    <textarea 
                      required
                      rows="4"
                      placeholder="Let's build something pretty good."
                      className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-[#A855F7] outline-none transition-colors resize-none placeholder:text-slate-700"
                    />
                  </div>
                  <button 
                    disabled={formStatus === 'sending'}
                    className="w-full py-5 bg-[#A855F7] text-white font-mono text-sm uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white hover:text-[#A855F7] transition-all flex items-center justify-center gap-3"
                  >
                    {formStatus === 'sending' ? 'Transmitting...' : (
                      <>
                        Initiate Contact
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-500 font-mono text-[10px] uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Kanton. All rights reserved.</p>
      </footer>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 border border-white/5 rounded-full parallax-text opacity-50" />
        <div className="absolute bottom-40 left-20 w-32 h-32 border border-white/5 rounded-full parallax-bg opacity-30" />
      </div>
    </div>
  );
}