import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from 'src/App'

// TODO
describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <App />
    )

    // Check if the login form elements are present
    expect(screen.getByText(/Branch ID/i)).toBeInTheDocument()
    expect(screen.getByText(/Username/i)).toBeInTheDocument()
    expect(screen.getByText(/Password/i)).toBeInTheDocument()
    // expect(screen.getByText(/Login/)).toBeInTheDocument()
  })

  // it('handles login correctly', async () => {
  //   const { getByLabelText, getByText } = render(
  //     <App />
  //   )

  //   // Mocking an API request (replace with your actual login function)
  //   const mockLogin = Mock.fn(() => Promise.resolve({ success: true }))

  //   // Mocking the login function in the component
  //   Mock('./Login', {
  //     login: mockLogin
  //   })

  //   // Simulate user input and submit the form
  //   fireEvent.change(screen.getByTitle(/Branch ID/i), { target: { value: '10001' } })
  //   fireEvent.change(screen.getByTitle(/Username/i), { target: { value: 'testuser01' } })
  //   fireEvent.change(screen.getByTitle(/Password/i), { target: { value: 'pa55w0rd001' } })
  //   fireEvent.click(screen.getByTitle(/Login/i))

  //   // Wait for the login function to be called and resolve
  //   await waitFor(() => expect(mockLogin).toHaveBeenCalled())

  // })
})
