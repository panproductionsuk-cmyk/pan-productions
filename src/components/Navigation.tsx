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
import { ChevronDown, Menu, Globe, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: t('nav.home'), path: '/', icon: Home },
    { label: t('nav.productions'), path: '/productions' },
    { label: t('nav.marketing'), path: '/marketing' },
    { label: t('nav.academy'), path: '/academy/workshops' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.news'), path: '/news' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 nav-backdrop">
      <div className="container mx-auto px-0">
        <div className="flex items-center h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/pan-logo.png"
              alt="Pan Productions"
              className="h-28 w-auto transition-transform hover:scale-105 rounded-lg py-4"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0 flex-1 justify-center">
            {navItems.map((item) => {
              const isItemActive = isActive(item.path);

              return (
                <Link 
                  key={item.label}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-1 px-2.5 py-2.5 uppercase font-semibold text-base tracking-[0.16em] rounded-md transition-colors font-heading',
                    isItemActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted/30 hover:text-primary'
                  )}
                  style={{ color: isItemActive ? undefined : '#dae45f' }}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Toggle */}
          <div className="hidden lg:flex items-center pr-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-white hover:text-primary">
                  <Globe className="h-4 w-4 text-white" />
                  <span className="font-medium">{language}</span>
                  <ChevronDown className="h-3 w-3 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-card/95 backdrop-blur-md border border-border/60"
              >
                <DropdownMenuItem onClick={() => setLanguage('EN')} className="text-muted-foreground hover:text-primary">
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('TR')} className="text-muted-foreground hover:text-primary">
                  Türkçe
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden mr-4">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const isItemActive = isActive(item.path);

                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center space-x-2 uppercase font-semibold text-sm tracking-[0.16em] rounded-md px-3 py-2 transition-colors font-heading',
                        isItemActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted/30 hover:text-primary'
                      )}
                      style={{ color: isItemActive ? undefined : '#dae45f' }}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t border-border/50">
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