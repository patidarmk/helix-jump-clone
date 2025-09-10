import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Puzzle, Brain, Trophy } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          The Ultimate 2048 Challenge
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Join the numbers and get to the 2048 tile! A simple yet addictive puzzle game to test your mind.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/2048">
              Play Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <Puzzle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">Simple to Learn</h3>
            <p className="mt-2 text-muted-foreground">
              Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <Brain className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">Engaging Puzzle</h3>
            <p className="mt-2 text-muted-foreground">
              Plan your moves carefully to combine tiles and reach the elusive 2048 tile.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">Beat Your High Score</h3>
            <p className="mt-2 text-muted-foreground">
              Challenge yourself to beat your own high score with every game you play.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;