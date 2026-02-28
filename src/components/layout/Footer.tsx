import { getTranslations } from 'next-intl/server';

export async function Footer() {
    const t = await getTranslations('Footer');
    return (
        <footer className="bg-card border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="space-y-4">
                    <div className="text-center text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} {t('copyright')}
                    </div>
                </div>
            </div>
        </footer>
    );
}
