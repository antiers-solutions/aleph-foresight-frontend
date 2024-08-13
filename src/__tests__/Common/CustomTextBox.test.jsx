import React from 'react'
import { Formik, Form } from 'formik';
import { render } from "@testing-library/react";
import CustomTextBox from "../../Common/CustomTextBox/CustomTextBox";
 
jest.mock('antd', () => ({
    ...jest.requireActual('antd'),
    TextArea: jest.fn(({ onChange, ...props }) => (
        <textarea onChange={(e) => onChange(e.target.value)} {...props} />
    )),
}));

jest.mock('../../Common/FormikError/FormikError', () => (props) => <div>{props.children}</div>);

const renderWithFormik = (ui, { initialValues, ...formikProps } = {}) => {
    return render(
        <Formik initialValues={initialValues} onSubmit={jest.fn()} {...formikProps}>
            <Form>{ui}</Form>
        </Formik>
    );
};
describe('custom text box',()=>{
    test('displays error message when touched and error exists', () => {
        const { getByRole, getByText } = renderWithFormik(
            <CustomTextBox
                name="description" 
                placeholder="Select an option"
            />,
            {
                initialValues: { description: '' },
                initialErrors: { description: 'Required' },
                initialTouched: { description: true },
            }
        );
    
        // Verify if the error message is displayed
        expect(getByText('Required')).toBeInTheDocument();
    });
})
