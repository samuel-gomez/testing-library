import * as React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import App from '../app';
import { submitForm } from '../api';

jest.mock('../api', () => ({
    submitForm: jest.fn().mockResolvedValue({ data: 'response data' }),
}));
  

  describe('Integration Test for Multi-Step Form Submission', () => {
    beforeEach(() => {
      submitForm.mockResolvedValue({ message: 'Form submitted successfully' });
    });  
    
    test('completes the form and navigates through the app correctly', async () => {
        render(<App />);
        
        // 1-2. Vérifie la présence du titre "Welcome home" sur la Home page
        expect(screen.getByText('Welcome home')).toBeInTheDocument();

        // 3-4. Navigue vers le formulaire
        user.click(screen.getByText('Fill out the form'));

        // 5-6. Vérifier la redirection vers Page 1 et la présence du titre "Page 1"
        expect(screen.getByText('Page 1')).toBeInTheDocument();

        // 7-8. Vérifier la présence du champ "Favorite food"
        expect(screen.getByLabelText(/favorite food/i)).toBeInTheDocument();

        // 9. Remplir le champ "Favorite food"
        user.type(screen.getByLabelText(/favorite food/i), 'Les pâtes');

        // 10-11. Naviguer vers Page 2
        user.click(screen.getByText('Next'));

        // 12-13. Vérifier la présence du titre "Page 2" sur Page 2
        expect(screen.getByText('Page 2')).toBeInTheDocument();

        // 14-15. Vérifier la présence du champ "Favorite drink"
        expect(screen.getByLabelText(/favorite drink/i)).toBeInTheDocument();

        // 16. Remplir le champ "Favorite drink"
        user.type(screen.getByLabelText(/favorite drink/i), 'Bières');

        // 17-18. Naviguer vers la page de confirmation
        user.click(screen.getByText(/review/i));

        // 19-20. Vérifier la présence du titre "Confirm" sur la page de confirmation
        expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();

        // 21-23. Vérifier le contenu des choix confirmés
        expect(screen.getByText(/please confirm your choices/i)).toBeInTheDocument();
        expect(screen.getByText(/les pâtes/i)).toBeInTheDocument();
        expect(screen.getByText(/bière/i)).toBeInTheDocument();

        // 25-26. Confirmer les choix
        user.click(screen.getByRole('button', { name: 'Confirm' }));

        // 27-28. Vérifier la redirection vers la page de félicitations
        await waitFor(() => {
            expect(screen.getByText("Congrats. You did it.")).toBeInTheDocument();
          });

        // 29-31. Retourner à la Home page
        user.click(screen.getByText(/go home/i));
        await waitFor(() => {
        expect(screen.getByText(/welcome home/i)).toBeInTheDocument();
        });
  });
});