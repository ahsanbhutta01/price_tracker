'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import AuthModal from './AuthModal'
import { LogIn, LogOut } from 'lucide-react'
import { signOut } from '@/app/actions'

const AuthButton = ({ user }) => {
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (user) {
    return (
      <form action={signOut}>
        <Button variant='ghost' size='sm' type="submit" className="gap-2">
          <LogOut className='size-4' />
          Sign Out
        </Button>
      </form>
    )
  }

  return (
    <>
      <Button
        variant='default'
        size="sm"
        className="bg-orange-500 hover:bg-orange-600 gap-2 cursor-pointer"
        onClick={() => setShowAuthModal(true)}
      >
        <LogIn className='size-4' />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}

export default AuthButton