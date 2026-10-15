import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { ArrowRight, BookOpen, Leaf, UsersRound } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../common/ui/button";
import LottieAnimation from "../config/assets/LottieAnimation.json";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border bg-gradient-to-br from-card via-card to-secondary/70 px-6 py-12 shadow-soft sm:px-12 sm:py-16 lg:px-16">
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-16 -z-10 h-72 w-72 rounded-full bg-accent blur-3xl"
      />
      <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1.5 text-xs font-medium text-primary">
              <Leaf aria-hidden="true" className="h-3.5 w-3.5" />A thoughtful
              space for your community
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Good stories grow <span className="text-primary">together.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground lg:mx-0">
              A simple, peaceful place to keep up with your people and the
              stories they share. Browse your community, add a post, or revisit
              a favorite.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="h-12 rounded-full px-6 shadow-md"
                  onClick={() => navigate("/users")}
                >
                  Open dashboard
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
              </motion.div>
              <span className="text-sm text-muted-foreground">
                A calmer way to stay connected
              </span>
            </div>
          </motion.div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <UsersRound aria-hidden="true" className="h-4 w-4 text-primary" />
              Your community
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen aria-hidden="true" className="h-4 w-4 text-primary" />
              Their stories
            </span>
          </div>
        </div>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="rounded-[2rem] border bg-card/70 p-4 shadow-soft backdrop-blur-sm">
            <Lottie
              animationData={LottieAnimation}
              className="mx-auto w-full"
              style={{ maxWidth: "340px" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomePage;
