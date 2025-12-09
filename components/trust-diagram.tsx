'use client';

import React from 'react';
import { Laptop, ArrowRight, Server, Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function TrustDiagram() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How Zero-Knowledge Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your secrets stay secret. We literally cannot read your notes – even if we wanted to.
          </p>
        </div>

        {/* Visual Diagram */}
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-4">
            {/* Step 1: Your Device */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="flex-1 text-center"
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-green-500/10 rounded-2xl border-2 border-green-500/30 mb-4">
                <Laptop className="w-12 h-12 text-green-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Your Device</h3>
              <p className="text-sm text-muted-foreground">
                Encryption happens <span className="text-green-500 font-medium">here</span>
              </p>
              <div className="mt-3 px-3 py-2 bg-green-500/10 rounded-lg">
                <code className="text-xs text-green-600 dark:text-green-400">
                  "Secret" → 🔐 → "8f7a9c..."
                </code>
              </div>
            </motion.div>

            {/* Arrow 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2"
            >
              <ArrowRight className="w-8 h-8 text-muted-foreground" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">Encrypted data only</span>
            </motion.div>

            {/* Step 2: VaultNote Server */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex-1 text-center"
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-muted/50 rounded-2xl border-2 border-border mb-4">
                <Server className="w-12 h-12 text-muted-foreground" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-muted rounded-full flex items-center justify-center border border-border">
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">VaultNote Server</h3>
              <p className="text-sm text-muted-foreground">
                We see <span className="text-muted-foreground font-medium">nothing readable</span>
              </p>
              <div className="mt-3 px-3 py-2 bg-muted/50 rounded-lg">
                <code className="text-xs text-muted-foreground">
                  Stores: "8f7a9c..." (gibberish)
                </code>
              </div>
            </motion.div>

            {/* Arrow 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2"
            >
              <ArrowRight className="w-8 h-8 text-muted-foreground" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">Link with key</span>
            </motion.div>

            {/* Step 3: Recipient */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 text-center"
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-2xl border-2 border-primary/30 mb-4">
                <Mail className="w-12 h-12 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Eye className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Recipient</h3>
              <p className="text-sm text-muted-foreground">
                Decrypts <span className="text-primary font-medium">locally</span>
              </p>
              <div className="mt-3 px-3 py-2 bg-primary/10 rounded-lg">
                <code className="text-xs text-primary">
                  "8f7a9c..." → 🔓 → "Secret"
                </code>
              </div>
            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 bg-green-500/5 rounded-xl border border-green-500/20"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center">
                <Laptop className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  Your Device
                  <Lock className="w-4 h-4 text-green-500" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Encryption happens here. Your text becomes unreadable gibberish.
                </p>
              </div>
            </motion.div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-border relative">
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-border"></div>
              </div>
            </div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-muted rounded-xl flex items-center justify-center">
                <Server className="w-7 h-7 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  VaultNote Server
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We only store encrypted data. We cannot read your notes.
                </p>
              </div>
            </motion.div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-border relative">
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-border"></div>
              </div>
            </div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  Recipient
                  <Eye className="w-4 h-4 text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Decryption happens in their browser using the key from the link.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-full shadow-sm">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">
                The key never touches our servers – mathematically impossible for us to read your data
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TrustDiagram;
