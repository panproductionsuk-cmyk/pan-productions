import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, Globe } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Productions', path: '/productions' },
    { label: 'PR & Marketing', path: '/marketing' },
    { 
      label: 'Pan Academy', 
      path: '/academy',
      children: [
        { label: 'Workshops', path: '/academy/workshops' },
        { label: 'Lessons', path: '/academy/lessons' }
      ]
    },
    { label: 'About Us', path: '/about' },
    { label: 'News & Press', path: '/news' },
    { label: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 nav-bar">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-14">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="flex items-center space-x-1 text-secondary-foreground hover:bg-foreground/10 font-medium uppercase text-sm tracking-wide"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="bg-card/95 backdrop-blur-md border-border/50"
                    >
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.path} asChild>
                          <Link 
                            to={child.path}
                            className={`w-full cursor-pointer transition-colors ${
                              isActive(child.path) ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                            }`}
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" asChild>
                    <Link 
                      to={item.path}
                      className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                        isActive(item.path) ? 'bg-foreground/10' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </nav>


          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div className="space-y-2">
                        <span className="font-medium text-foreground">{item.label}</span>
                        <div className="ml-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setIsOpen(false)}
                              className={`block text-sm transition-colors ${
                                isActive(child.path) ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block font-medium transition-colors ${
                          isActive(item.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-border/50 space-y-4">
                  <Link to="/get-involved" onClick={() => setIsOpen(false)}>
                    <Button variant="spotlight" className="w-full">
                      Get Involved
                    </Button>
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Language:</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant={language === 'EN' ? 'default' : 'ghost'} 
                        size="sm"
                        onClick={() => setLanguage('EN')}
                      >
                        EN
                      </Button>
                      <Button 
                        variant={language === 'TR' ? 'default' : 'ghost'} 
                        size="sm"
                        onClick={() => setLanguage('TR')}
                      >
                        TR
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;