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
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: t('nav.productions'), path: '/productions' },
    { label: t('nav.marketing'), path: '/marketing' },
    { 
      label: t('nav.academy'), 
      path: '/academy',
      children: [
        { label: t('nav.workshops'), path: '/academy/workshops' }
      ]
    },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.news'), path: '/news' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 nav-backdrop">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/pan-logo.svg"
              alt="Pan Productions"
              className="h-28 w-auto transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0">
            {navItems.map((item) => {
              const isParentActive = item.children
                ? item.children.some((child) => isActive(child.path)) || isActive(item.path)
                : isActive(item.path);

              return (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className={cn(
                            'flex items-center space-x-1 rounded-md px-2 py-2 uppercase font-semibold text-s tracking-[0.1em] transition-colors',
                            isParentActive
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'hover:bg-muted/30 hover:text-primary'
                          )}
                          style={{ color: isParentActive ? undefined : '#dae45f' }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="start" 
                        className="bg-card/95 backdrop-blur-md border border-border/60"
                      >
                        {item.children.map((child) => (
                          <DropdownMenuItem key={child.path} asChild>
                            <Link 
                              to={child.path}
                              className={cn(
                                'w-full rounded-md px-3 py-2 uppercase font-semibold text-sm tracking-[0.16em] transition-colors',
                                isActive(child.path)
                                  ? 'bg-primary text-primary-foreground shadow-sm'
                                  : 'hover:bg-muted/30 hover:text-primary'
                              )}
                              style={{ color: isActive(child.path) ? undefined : '#dae45f' }}
                            >
                              {child.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link 
                      to={item.path}
                      className={cn(
                        'px-3 py-2 uppercase font-semibold text-sm tracking-[0.16em] rounded-md transition-colors',
                        isParentActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'hover:bg-muted/30 hover:text-primary'
                      )}
                      style={{ color: isParentActive ? undefined : '#dae45f' }}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA and Language Toggle */}
          <div className="hidden lg:flex items-center space-x-3 pr-8">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">{language}</span>
                  <ChevronDown className="h-3 w-3" />
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

            {/* Get Involved CTA */}
            <Link to="/get-involved">
              <Button variant="spotlight" className="px-8 py-2.5">
                {t('nav.getInvolved')}
              </Button>
            </Link>
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
                  const isParentActive = item.children
                    ? item.children.some((child) => isActive(child.path)) || isActive(item.path)
                    : isActive(item.path);

                  return (
                    <div key={item.label}>
                      {item.children ? (
                        <div className="space-y-2">
                          <span 
                            className={cn(
                              'block uppercase font-semibold text-sm tracking-[0.16em]',
                              isParentActive ? 'text-primary' : ''
                            )}
                            style={{ color: isParentActive ? undefined : '#dae45f' }}
                          >
                            {item.label}
                          </span>
                          <div className="ml-4 space-y-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  'block uppercase font-semibold text-sm tracking-[0.16em] rounded-md px-3 py-2 transition-colors',
                                  isActive(child.path)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted/30 hover:text-primary'
                                )}
                                style={{ color: isActive(child.path) ? undefined : '#dae45f' }}
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
                          className={cn(
                            'block uppercase font-semibold text-sm tracking-[0.16em] rounded-md px-3 py-2 transition-colors',
                            isParentActive
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted/30 hover:text-primary'
                          )}
                          style={{ color: isParentActive ? undefined : '#dae45f' }}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
                
                <div className="pt-4 border-t border-border/50 space-y-4">
                  <Link to="/get-involved" onClick={() => setIsOpen(false)}>
                    <Button variant="spotlight" className="w-full">
                      {t('nav.getInvolved')}
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