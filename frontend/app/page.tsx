'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Play,
  Star,
  ChevronDown,
  Zap,
  Target,
  TrendingUp,
  Users,
  FileText,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

// ─── Navbar ─────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: 'Platform',
      children: [
        { label: 'Browse Briefs', href: '/briefs', desc: 'Explore open campaigns' },
        { label: 'For Brands', href: '/dashboard/brand', desc: 'Manage your campaigns' },
        { label: 'AI Analysis', href: '/analysis', desc: 'ROI & trend insights' },
      ],
    },
    {
      label: 'Solutions',
      children: [
        { label: 'Pricing', href: '/pricing', desc: 'Plans that scale with you' },
        { label: 'Subscribe Pro', href: '/subscribe', desc: 'Unlock premium features' },
        { label: 'Blueprint', href: '/blueprint', desc: 'See our roadmap' },
      ],
    },
    {
      label: 'Company',
      children: [
        { label: 'About', href: '/profile', desc: 'Our mission & methodology' },
        { label: 'Contact', href: '/contact', desc: 'Enterprise & support' },
      ],
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${scrolled
          ? 'bg-black/60 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Clario</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white">
                {item.label}
                <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-2 shadow-2xl"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                      >
                        <span className="text-sm font-medium text-white">{child.label}</span>
                        <span className="text-xs text-white/40">{child.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/sign-in"
            className="rounded-full px-5 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Sign In
          </Link>
          <Link href="/sign-up" className="btn-premium !py-2.5 !px-6 !text-xs">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) =>
                item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="block text-sm text-white/70 hover:text-white transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))
              )}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link href="/sign-in" className="text-sm text-white/70">Sign In</Link>
                <Link href="/sign-up" className="btn-premium text-center !py-3">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Floating Shapes ────────────────────────────
function FloatingShapes() {
  const shapes = [
    { color: 'rgba(245, 208, 227, 0.5)', size: 180, x: 70, y: 60, delay: 0 },
    { color: 'rgba(248, 215, 207, 0.4)', size: 140, x: 82, y: 45, delay: 0.5 },
    { color: 'rgba(216, 220, 242, 0.45)', size: 120, x: 75, y: 75, delay: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + shape.delay, duration: 1 }}
          className="absolute rounded-[2.5rem]"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size * 1.2,
            background: shape.color,
            backdropFilter: 'blur(1px)',
            animation: `float ${4 + i}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Projects Carousel ──────────────────────────
function ProjectsCarousel() {
  const [active, setActive] = useState(0);
  const projects = [
    { title: 'Glow Serum Campaign', industry: 'Skincare', roi: '4.8x ROI', color: '#f5d0e3' },
    { title: 'FitTech Pro Launch', industry: 'Fitness', roi: '3.2x ROI', color: '#e2f0cb' },
    { title: 'StyleDrop Rebrand', industry: 'Fashion', roi: '5.1x ROI', color: '#d8dcf2' },
    { title: 'CloudBite Food App', industry: 'Food', roi: '4.0x ROI', color: '#f8d7cf' },
    { title: 'TravelVista Series', industry: 'Travel', roi: '6.2x ROI', color: '#fce4f1' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % projects.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [projects.length]);

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="badge text-gray-500 border-gray-200 mb-4 inline-flex">
            <span className="grid grid-cols-2 gap-0.5 mr-1">
              {[0, 1, 2, 3].map(i => <span key={i} className="h-1 w-1 rounded-full bg-purple-400" />)}
            </span>
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Scripts That Convert
          </h2>
        </motion.div>

        {/* Carousel Track */}
        <div className="relative h-[480px] flex items-center justify-center">
          {projects.map((project, i) => {
            const offset = i - active;
            const absOffset = Math.abs(offset);

            return (
              <motion.div
                key={i}
                animate={{
                  x: offset * 280,
                  scale: absOffset === 0 ? 1 : absOffset === 1 ? 0.88 : 0.75,
                  opacity: absOffset <= 2 ? 1 - absOffset * 0.3 : 0,
                  zIndex: 10 - absOffset,
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="absolute w-[260px] rounded-3xl overflow-hidden shadow-lg"
                style={{ aspectRatio: '4/5' }}
              >
                <div
                  className="w-full h-full flex flex-col justify-end p-6"
                  style={{ background: project.color }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                    {project.industry}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-purple-600">
                    <TrendingUp size={14} />
                    {project.roi}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-purple-500' : 'w-2 bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Landing Page ──────────────────────────
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #050505 0%, #050505 45%, #a855f7 85%, #f8f9fa 100%)',
        }}
      >
        <FloatingShapes />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="badge text-white/80 border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  Now Live — Join 500+ Brands
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight"
              >
                Viral Scripts.{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Faster.
                </span>
                <br />
                With Our Expertise!
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                className="text-lg text-white/50 max-w-md leading-relaxed"
              >
                Connect with elite UGC script writers. Get scroll-stopping scripts that convert viewers into customers.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link href="/sign-up" className="btn-white flex items-center gap-2">
                  Get Started Free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white/60 border border-white/10 hover:border-white/20 transition-all hover:text-white"
                >
                  <Play size={14} />
                  View Case Study
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-3">
                  {['A', 'S', 'M'].map((initial, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black text-sm font-bold"
                      style={{
                        background: ['#a855f7', '#f15bb5', '#00f2ff'][i],
                        color: '#fff',
                      }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#ffb800" color="#ffb800" />
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">from 2,400+ reviews</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column — Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                  Platform Metrics
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Avg ROI', value: '4.8x', icon: TrendingUp },
                    { label: 'Scripts Delivered', value: '10K+', icon: FileText },
                    { label: 'Active Writers', value: '2.5K', icon: Users },
                    { label: 'Success Rate', value: '97%', icon: ShieldCheck },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <stat.icon size={18} className="text-purple-400" />
                      <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                      <p className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative py-32 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="badge text-gray-500 border-gray-200 mb-4 inline-flex">
              <span className="grid grid-cols-2 gap-0.5 mr-1">
                {[0, 1, 2, 3].map(i => <span key={i} className="h-1 w-1 rounded-full bg-purple-400" />)}
              </span>
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Three Steps to Viral
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Post Your Brief',
                desc: 'Describe your product, audience, and creative direction. Set your budget and watch writers compete for your project.',
                icon: Target,
                color: '#c87aa9',
              },
              {
                step: '02',
                title: 'Review Scripts',
                desc: 'Browse submissions from vetted writers. Compare scripts, check ratings, and find the perfect match for your brand voice.',
                icon: FileText,
                color: '#697ccc',
              },
              {
                step: '03',
                title: 'Approve & Scale',
                desc: 'Approve winning scripts, release secure payments, and track your ROI. Scale your content engine effortlessly.',
                icon: Zap,
                color: '#a855f7',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="glass-card-light relative overflow-hidden group"
              >
                {/* Step number background */}
                <span className="absolute top-4 right-4 text-[80px] font-black text-gray-100 leading-none select-none">
                  {item.step}
                </span>
                <div className="relative z-10 space-y-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: item.color + '20' }}
                  >
                    <item.icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 glass-card-light flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0"
          >
            {[
              { value: '4.8x', label: 'Average ROI' },
              { value: '10K+', label: 'Scripts Written' },
              { value: '500+', label: 'Active Brands' },
              { value: '<24h', label: 'Avg. Delivery' },
            ].map((stat, i) => (
              <div key={i} className="text-center flex-1">
                <p className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PROJECTS CAROUSEL ═══ */}
      <ProjectsCarousel />

      {/* ═══ CTA SECTION ═══ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #f8f9fa 0%, #050505 40%)',
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Ready to Create{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Viral Content
              </span>
              ?
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              Join 500+ brands and 2,500+ writers on the fastest-growing UGC marketplace.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sign-up" className="btn-premium flex items-center gap-2">
                Start Creating Now
                <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" className="btn-dark">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-black border-t border-white/5 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold">Clario</span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed">
                The AI-powered marketplace connecting brands with elite UGC script writers.
              </p>
            </div>
            {[
              {
                title: 'Platform',
                links: [
                  { label: 'Browse Briefs', href: '/briefs' },
                  { label: 'Dashboard', href: '/dashboard/brand' },
                  { label: 'AI Analysis', href: '/analysis' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About', href: '/profile' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Contact', href: '/contact' },
                ],
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Blueprint', href: '/blueprint' },
                  { label: 'Subscribe', href: '/subscribe' },
                  { label: 'Support', href: '/contact?reason=support' },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} Clario. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <span key={item} className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
