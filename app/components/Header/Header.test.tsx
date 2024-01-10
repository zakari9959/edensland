import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import userEvent from '@testing-library/user-event';
import { UserIdContextProvider } from '@/app/context/userIdContext';

test('Le lien "Accueil" fonctionne correctement', async () => {
  const user = userEvent.setup();
  render(
    <UserIdContextProvider>
      <Header />
    </UserIdContextProvider>
  );

  const accueilLink = screen.getByRole('link', { name: 'Accueil' });
  await user.click(accueilLink);
  await screen.findByText('Accueil');
  expect(window.location.pathname).toBe('/');
});

test('Le lien "Ma Bibliothèque" fonctionne correctement', async () => {
  const user = userEvent.setup();
  render(
    <UserIdContextProvider>
      <Header />
    </UserIdContextProvider>
  );

  const bibliLink = screen.getByRole('link', { name: 'Ma Bibliothèque' });
  await user.click(bibliLink);
  await screen.findByText('Ma Bibliothèque');
  expect(window.location.pathname).toBe('/bibli');
});

test('Le lien "Lecteur" fonctionne correctement', async () => {
  const user = userEvent.setup();
  render(
    <UserIdContextProvider>
      <Header />
    </UserIdContextProvider>
  );

  const lecteurLink = screen.getByRole('link', { name: 'Lecteur' });
  await user.click(lecteurLink);
  await screen.findByText('Lecteur');
  expect(window.location.pathname).toBe('/reader');
});
