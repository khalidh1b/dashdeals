import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const EmptyState = ({ type }) => {
  const isCart = type === 'cart'
  
  return (
    <div className={`flex flex-col ${type === 'cart' && 'w-2/3 mx-auto'} items-center justify-center h-screen col-span-3 bg-background px-4`}>
      <div className="flex flex-col items-center gap-6 w-full text-center">
        <div className="p-4 rounded-full bg-muted">
          {isCart ? (
            <ShoppingCart className="w-12 h-12 text-muted-foreground" strokeWidth={1.5} />
          ) : (
            <Heart className="w-12 h-12 text-muted-foreground" strokeWidth={1.5} />
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground text-balance">
            {isCart ? 'Your cart is empty' : 'Your wishlist is empty'}
          </h2>
          <p className="text-muted-foreground text-balance">
            {isCart
              ? 'Add items to your cart and proceed to checkout'
              : 'Save your favorite items here for easy access later'}
          </p>
        </div>

        <Link to={'/'}>
          <Button
            size="lg"
            className="mt-2"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
};