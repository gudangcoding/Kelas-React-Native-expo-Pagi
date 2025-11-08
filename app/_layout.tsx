import { Slot } from "expo-router";
import { Provider } from 'react-redux';
import { store, useAppDispatch } from '@/redux/store';
import React, { useEffect } from 'react';
import { hydrateFromStorage } from '@/redux/slices/authSlice';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <HydrateAuth>
        <Slot />
      </HydrateAuth>
    </Provider>
  );
}

function HydrateAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);
  return <>{children}</>;
}
