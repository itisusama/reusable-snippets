# Step 1
DON'T FORGET TO INSTALL SHADCN

Go to your src/components/Modal.tsx and paste to following code

``` tsx
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ModalContent } from "./ModalContent"
import { DialogTitle } from "@radix-ui/react-dialog"

interface ModalProps {
  modalKey: string
  openKey: string | null
  setOpenKey: (key: string | null) => void
}

export function Modal({ modalKey, openKey, setOpenKey }: ModalProps) {
  const isOpen = openKey === modalKey
  const content = ModalContent[modalKey] || <p>No content found.</p>

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setOpenKey(open ? modalKey : null)}>
      <DialogTitle className="hidden">{modalKey}</DialogTitle>
      <DialogContent className="sm:max-w-[425px]">{content}</DialogContent>
    </Dialog>
  )
}
```
# Step 2

Go to your src/components/ModalContent.tsx and paste to following code
```tsx
import React from "react"
import LoginForm from "./forms/login-form"
import RegisterForm from "./forms/register-form"
import ResetForm from "./forms/reset-form"
import RegisterOtp from "./register-otp"
import ResetOtp from "./reset-otp"

export const ModalContent: Record<string, React.ReactNode> = {
  login: <LoginForm/>,
  register: <RegisterForm/>,
  reset: <ResetForm/>,
  registerOtpModal: <RegisterOtp/>,
  resetOtpModal: <ResetOtp/>,
}

export default ModalContent
```
Give a name and call the component that you want to show in the modal.

# Step 3

How to use it?
With the button...
Call the following state in any of your components...
```tsx
const [openKey, setOpenKey] = useState<string | null>(null)
```
Then...
```tsx
<Button variant="ghost" onClick={() => setOpenKey("login")}>Log in</Button>
```
(You can do with as many buttons as you want in a single component)

Then, at the very bottom of the component, add (after importing Modal).

```tsx
<Modal modalKey="login" openKey={openKey} setOpenKey={setOpenKey} />
```
