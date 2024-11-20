'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Book, Code, Cpu, Github, Mail, MapPin, Phone, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function Component() {
  const [activeSection, setActiveSection] = useState('')
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const certificatesRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.8])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    const sections = [aboutRef, projectsRef, certificatesRef, contactRef]
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current)
        }
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <header className="py-6 px-4 sm:px-6 lg:px-8 sticky top-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm z-10 shadow-lg">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            DSA Portfolio
          </Link>
          <div className="flex space-x-6">
            {['About', 'Projects', 'Certificates', 'Contact'].map((item) => (
              <TooltipProvider key={item}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => scrollToSection(
                        item === 'About' ? aboutRef :
                        item === 'Projects' ? projectsRef :
                        item === 'Certificates' ? certificatesRef :
                        contactRef
                      )}
                      className={`text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-3 py-2 ${
                        activeSection.toLowerCase() === item.toLowerCase() ? 'text-blue-400' : ''
                      }`}
                    >
                      {item}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to {item}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.section 
          className="flex flex-col md:flex-row items-center mb-24"
          style={{ opacity, scale }}
        >
          <div className="md:w-1/3 mb-8 md:mb-0">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Avatar className="w-48 h-48 mx-auto ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-900 transition-all duration-300 hover:ring-offset-8">
                <AvatarImage src="/images/profile_pic.jpg" alt="Pragyansh Suman" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <motion.h1 
              className="text-5xl font-extrabold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Pragyansh Suman
            </motion.h1>
            <motion.p 
              className="text-2xl text-blue-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Data Structures & Algorithms Enthusiast
            </motion.p>
            <motion.p 
              className="text-gray-300 mb-8 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I'm a passionate developer with a strong foundation in Data Structures and Algorithms. 
              My goal is to create efficient and scalable solutions to complex problems.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                onClick={() => scrollToSection(contactRef)} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mb-12"
        >
          <ChevronDown className="w-8 h-8 text-blue-400 animate-bounce" />
        </motion.div>

        <section id="about" ref={aboutRef} className="mb-24 scroll-mt-24">
          <motion.h2 
            className="text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About My DSA Journey
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="h-12 w-12 text-blue-500" />}
              title="Algorithmic Mastery"
              description="Proficient in designing and implementing efficient algorithms for various computational problems."
            />
            <FeatureCard
              icon={<Cpu className="h-12 w-12 text-green-500" />}
              title="Data Structure Proficiency"
              description="Expert in utilizing advanced data structures to optimize solution performance and memory usage."
            />
            <FeatureCard
              icon={<Book className="h-12 w-12 text-purple-500" />}
              title="Problem-Solving Skills"
              description="Skilled in breaking down complex problems and developing systematic approaches to solve them."
            />
          </div>
        </section>

        <section id="projects" ref={projectsRef} className="mb-24 scroll-mt-24">
          <motion.h2 
            className="text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Linked List Working Visualizer"
              description="Interactive tool for visualizing Linked List's Different Functions."
              image="/images/Project1.jpg?height=200&width=300"
            />
            <ProjectCard
              title="SRM Accommo Website"
              description="Students can find the contact details of nearby brokers and choose suitable accommodations near the SRM University Easily."
              image="/images/Website.jpg?height=200&width=300"
            />
            <ProjectCard
              title="Menu For BST"
              description="Menu for Different functions which user can perform upon the BST(Binary Search Tree)"
              image="/images/bst2.png?height=200&width=300"
            />
          </div>
        </section>

        <section id="certificates" ref={certificatesRef} className="mb-24 scroll-mt-24">
          <motion.h2 
            className="text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Certificates
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CertificateCard
              title="Elab"
              issuer="SRM Elab"
              date="Oct 2024"
              image="/images/ELAB.jpg?height=150&width=250"
            />
            <CertificateCard
              title="C++ DATA STRUCTURES AND ALGORITHMS"
              issuer="Udemy"
              date="Oct 2024"
              image="/images/udemy.png?height=150&width=250"
            />
            <CertificateCard
              title="Competitive Programmer's Core Skills"
              issuer="Udemy"
              date="Nov 2023"
              image="/images/udemy2.png?height=150&width=250"
            />
          </div>
        </section>

        <section id="contact" ref={contactRef} className="mb-24 scroll-mt-24">
          <motion.h2 
            className="text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ContactCard icon={<Mail className="h-8 w-8" />} title="Email" content="ps5002@srmist.edu.in" />
            <ContactCard icon={<Phone className="h-8 w-8" />} title="Phone" content="+91 7807712814" />
            <ContactCard icon={<MapPin className="h-8 w-8" />} title="Address" content="Room No.-402, Oori Hostel, Near Shiva Temple, SRM University" />
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">&copy; 2024 Pragyansh Suman. All rights reserved.</p>
          <div className="flex space-x-6">
            <SocialLink href="https://github.com/PragyanshSuman" icon={<Github className="h-6 w-6" />} label="GitHub" />
            <SocialLink href="mailto:ps5002@srmist.edu.in" icon={<Mail className="h-6 w-6" />} label="Email" />
            <SocialLink href="tel:+917807712814" icon={<Phone className="h-6 w-6" />} label="Phone" />
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">{icon}</div>
          <CardTitle className="text-2xl font-semibold text-white text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300 text-center">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ProjectCard({ title, description, image }: { title: string; description: string; image: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      
      viewport={{ once: true }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
        <div className="relative h-48 overflow-hidden">
          <Image src={image} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 transform hover:scale-110" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CertificateCard({ title, issuer, date, image }: { title: string; issuer: string; date: string; image: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
        <div className="relative h-40 overflow-hidden">
          <Image src={image} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 transform hover:scale-110" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>{issuer}</span>
            <span>{date}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ContactCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
        <CardHeader>
          <div className="flex items-center space-x-4">
            {icon}
            <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300 text-center">{content}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="text-gray-300 hover:text-white transition-colors">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {icon}
            </motion.div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}