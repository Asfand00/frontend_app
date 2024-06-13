import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StackNavigator from './src/navigation/StackNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StackNavigator />
    </QueryClientProvider>
  );
}
