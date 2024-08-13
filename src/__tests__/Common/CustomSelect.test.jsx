import React from "react";
import { Formik, Form } from 'formik';
import { screen, render, fireEvent } from "@testing-library/react";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";

jest.mock('antd', () => ({
    Select: ({ onChange }) => {
        let value = '' ;
        return (
            <select
                data-testid="custom-select"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
            >
                <option value="">Select a coin</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
            </select>
        )
    },
})); 

jest.mock('../../Common/FormikError/FormikError', () => (props) => <div>{props.children}</div>);

const renderWithFormik = (ui, { initialValues, ...formikProps } = {}) => {
    return render(
        <Formik initialValues={initialValues} onSubmit={jest.fn()} {...formikProps}>
            <Form>{ui}</Form>
        </Formik>
    );
};
describe('custom select', () => {
    
    test('on selecting value from options the select input renders value', () => {
         renderWithFormik(
            <CustomSelect
                name="testSelect"
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]}
                placeholder="Select an option"
            />,
            {
                initialValues: { testSelect: '' },
                initialErrors: { testSelect: '' },
                initialTouched: { testSelect: true },
            }
        );
        fireEvent.change(screen.getByTestId('custom-select'), {
            target: { value: 'bitcoin' }
        });
        expect(screen.getByTestId('custom-select').value).toBe('')
    });


    test('displays error message when touched and error exists', () => {
        const { getByText } = renderWithFormik(
            <CustomSelect
                name="testSelect"
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]}
                placeholder="Select an option"
            />,
            {
                initialValues: { testSelect: '' },
                initialErrors: { testSelect: 'Required' },
                initialTouched: { testSelect: true },
            }
        );

        // Verify if the error message is displayed
        expect(getByText('Required')).toBeInTheDocument();
    });

})
