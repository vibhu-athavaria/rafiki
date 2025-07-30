import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import ZenIcon from 'components/ui/ZenIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    // {
    //   title: 'Company',
    //   links: [
    //     { name: 'About', href: '#about' },
    //     { name: 'Contact', href: '#contact' },
    //     { name: 'Privacy Policy', href: '#privacy' }
    //   ]
    // },
    // {
    //   title: 'Product',
    //   links: [
    //     { name: 'Features', href: '#features' },
    //     { name: 'Beta Program', href: '#beta-signup' },
    //     { name: 'Roadmap', href: '#roadmap' }
    //   ]
    // },
    // {
    //   title: 'Support',
    //   links: [
    //     { name: 'Help Center', href: '#help' },
    //     { name: 'Documentation', href: '#docs' },
    //     { name: 'Community', href: '#community' }
    //   ]
    // }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center mr-3">
                <ZenIcon />
              </div>
              <span className="text-2xl font-bold">Rafiki</span>
            </div>

            {/* <p className="text-gray-400 mb-6 leading-relaxed">
              Built for coaches who care. Rafiki combines AI technology with intuitive design to help coaching professionals excel in their practice.
            </p> */}

            {/* <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-lg p-4">
              <p className="text-blue-400 font-medium text-sm">
                ✨ Built for coaches who care
              </p>
            </div> */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <p className="text-gray-400 mb-6 leading-relaxed">
              Built for coaches who care. Rafiki combines AI technology with intuitive design to help coaching professionals excel in their practice.
            </p>
          </motion.div>
          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center text-gray-400">
              <Mail className="h-5 w-5 mr-3 text-blue-400" />
              <span>hello@rafiki.ai</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Phone className="h-5 w-5 mr-3 text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center text-gray-400">
              <MapPin className="h-5 w-5 mr-3 text-blue-400" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </motion.div> */}

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Rafiki. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;