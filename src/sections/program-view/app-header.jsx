import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

import "./app-header.css";


export default function AppHeaderRequest() {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };


    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="text-5xl md:text-7xl font-bold text-center mb-8"
                variants={itemVariants}
            >

           
                <motion.span
                    className="block"
                    whileHover={{ scale: 1.05, color: '#FCD34D' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    ศูนย์บริการโปรแกรม
                </motion.span>

                <motion.span
                    className="block mt-2"
                    whileHover={{ scale: 1.05, color: '#FCD34D' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                   <TypeAnimation sequence={[' Center', 5000, 'ในโรงพยาบาลยันฮี', 5000]} speed={50} repeat={Infinity} />

                    {/* <motion.span
                        className="inline-block bg-yellow-300 text-blue-800 px-4 py-2 rounded-lg ml-2"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ในโรงพยาบาลยันฮี
                    </motion.span> */}

                </motion.span>
            </motion.h1>

            <motion.p
                className="text-2xl md:text-3xl text-center mt-4 mb-8"
                variants={itemVariants}
            >
                โปรแกรมที่พัฒนาขึ้นเพื่อใช้งานในโรงพยาบาล
            </motion.p>

            <motion.div
                className="text-xl md:text-2xl font-semibold bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.5)' }}
            >
                IT Development
            </motion.div>
        </motion.div>
    );
}
