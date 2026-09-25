import { Metadata } from 'next';
import MyPlanClient from '../../components/homepage/MyPlanClient';

export const metadata: Metadata = {
  title: 'My Plan - FitLog',
  description: 'Track your daily workout plans, saved routines, and fitness progress with FitLog.',
};

const MyPlanPage = () => {
  return <MyPlanClient />;
};

export default MyPlanPage;