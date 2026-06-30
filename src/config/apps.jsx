import { User, FolderOpen, Github, Linkedin, Code2, Instagram, Mail, Terminal } from 'lucide-react'
import AboutApp from '../apps/AboutApp'
import ProjectsApp from '../apps/ProjectsApp'
import SocialApp from '../apps/SocialApp'
import ContactApp from '../apps/ContactApp'
import TerminalApp from '../apps/TerminalApp'
import { SOCIALS } from './portfolio'

export const APPS = [
  {
    id: 'terminal',
    label: 'Terminal',
    icon: Terminal,
    color: '#00ff41',
    component: TerminalApp,
    defaultSize: { width: 700, height: 480 },
    minSize: { width: 480, height: 320 },
  },
  {
    id: 'about',
    label: 'About Me',
    icon: User,
    color: '#00ff7f',
    component: AboutApp,
    defaultSize: { width: 480, height: 560 },
    minSize: { width: 360, height: 440 },
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    color: '#00e5ff',
    component: ProjectsApp,
    defaultSize: { width: 840, height: 580 },
    minSize: { width: 620, height: 420 },
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: Github,
    color: '#bd93f9',
    externalUrl: SOCIALS.github.url,
    component: () => (
      <SocialApp platform="GitHub" IconComp={Github} handle={SOCIALS.github.handle} url={SOCIALS.github.url} color="#bd93f9" description="Open-source projects, side hacks, and daily commits." />
    ),
    defaultSize: { width: 340, height: 320 },
    minSize: { width: 280, height: 270 },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    color: '#38bdf8',
    externalUrl: SOCIALS.linkedin.url,
    component: () => (
      <SocialApp platform="LinkedIn" IconComp={Linkedin} handle={SOCIALS.linkedin.handle} url={SOCIALS.linkedin.url} color="#38bdf8" description="Professional experience, education, and recommendations." />
    ),
    defaultSize: { width: 340, height: 320 },
    minSize: { width: 280, height: 270 },
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    icon: Code2,
    color: '#fbbf24',
    externalUrl: SOCIALS.leetcode.url,
    component: () => (
      <SocialApp platform="LeetCode" IconComp={Code2} handle={SOCIALS.leetcode.handle} url={SOCIALS.leetcode.url} color="#fbbf24" description={`${SOCIALS.leetcode.solvedCount} problems solved. Consistent DSA grind.`} />
    ),
    defaultSize: { width: 340, height: 320 },
    minSize: { width: 280, height: 270 },
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    color: '#f472b6',
    externalUrl: SOCIALS.instagram.url,
    component: () => (
      <SocialApp platform="Instagram" IconComp={Instagram} handle={SOCIALS.instagram.handle} url={SOCIALS.instagram.url} color="#f472b6" description="A peek at life outside the terminal." />
    ),
    defaultSize: { width: 340, height: 320 },
    minSize: { width: 280, height: 270 },
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    color: '#34d399',
    component: ContactApp,
    defaultSize: { width: 440, height: 520 },
    minSize: { width: 360, height: 460 },
  },
]
