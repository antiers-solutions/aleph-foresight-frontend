import React from 'react';
import { render, screen } from '@testing-library/react';
import FormikError from '../../Common/FormikError/FormikError';

describe('FormikError Component', () => {
    test('renders error message correctly', () => {
        // Render the FormikError component with a sample error message
        const {
            container
        } = render(<FormikError>An error occurred!</FormikError>);

        // Check if the error message is rendered
        const errorMessage = container.querySelector('.error');
        expect(errorMessage).toBeInTheDocument();
    });
});
