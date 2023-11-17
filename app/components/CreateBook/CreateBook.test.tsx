import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateBook from './CreateBook';
import userEvent from '@testing-library/user-event';

test('Le bouton du formulaire est cliquable lorsque le formulaire est rempli correctement', async () => {
  const user = userEvent.setup();

  const { getByText } = render(<CreateBook />);

  // Remplissez le formulaire correctement
  const titleInput = getByText('Titre:');
  const ageSelect = getByText('Âge:');
  const descriptionInput = getByText('Description du personnage:');
  const textInput = getByText(
    'Texte (Chaque page doit être entre guillemet et séparé par une virgule "page1","page2","page3",):'
  );
  const submitButton = getByText('Créez le livre');

  fireEvent.change(titleInput, { target: { value: 'Mon Titre' } });
  fireEvent.change(ageSelect, { target: { value: '4-6' } });
  fireEvent.change(descriptionInput, { target: { value: 'Ma Description' } });
  fireEvent.change(textInput, { target: { value: 'page1,page2,page3' } });

  // Attendez que le formulaire soit validé
  await waitFor(() => {
    expect(submitButton).not.toBeDefined(); // Vérifiez que le bouton n'est pas désactivé
  });
});
