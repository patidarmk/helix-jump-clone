import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Get In Touch
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            We'd love to hear from you! Send us a message.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-indigo-600" />
                <p>contact@arcadehub.com</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-indigo-600" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-indigo-600" />
                <p>123 Gaming Lane, Virtual City, 98765</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;