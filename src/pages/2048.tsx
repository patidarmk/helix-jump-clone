import { Layout } from '@/components/Layout';
import Game2048 from '@/components/2048/Game';

const Page2048 = () => {
  return (
    <Layout>
      <div className="flex-grow flex items-center justify-center">
        <Game2048 />
      </div>
    </Layout>
  );
};

export default Page2048;