import { render, screen, fireEvent } from '@testing-library/react'
import ContactForm from '../components/ContactForm'

describe('ContactForm', () => {
  it('shows validation error when message too short', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'hi' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText(/10\+ chars/i)).toBeInTheDocument()
  })
})
