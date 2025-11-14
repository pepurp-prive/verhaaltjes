'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FormSection } from '@/components/form-section';
import { AiButton } from '@/components/ai-button';
import { dropdownOptions } from '@/lib/character-options';
import { generateCharacterDetails } from '@/ai/flows/generate-character-details';
import { aiFillCharacterCategories } from '@/ai/flows/ai-fill-character-categories';
import { generateAiFieldContent } from '@/ai/flows/generate-individual-character-fields';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { TagInput } from '@/components/tag-input';
import { Switch } from '@/components/ui/switch';
import { mockCharacters } from '@/lib/mock-data';

const characterFormSchema = z.object({
  name: z.string().min(1, 'Naam is verplicht.'),
  age: z.string().optional(),
  gender: z.enum(['Man', 'Vrouw'], { required_error: 'Geslacht is verplicht.' }),
  role: z.string().optional(),
  roleOther: z.string().optional(),
  job: z.string().optional(),
  location: z.string().optional(),
  lengthM: z.string().optional(),
  lengthCm: z.string().optional(),
  build: z.string().optional(),
  buildOther: z.string().optional(),
  hairColor: z.string().optional(),
  hairColorOther: z.string().optional(),
  hairStyle: z.string().optional(),
  hairStyleOther: z.string().optional(),
  eyes: z.string().optional(),
  eyesOther: z.string().optional(),
  facialHair: z.string().optional(),
  facialHairOther: z.string().optional(),
  bodyHair: z.array(z.string()).optional(),
  breastsCup: z.string().optional(),
  breastsCupOther: z.string().optional(),
  breastsShape: z.string().optional(),
  breastsShapeOther: z.string().optional(),
  buttocksSize: z.string().optional(),
  buttocksSizeOther: z.string().optional(),
  buttocksShape: z.string().optional(),
  buttocksShapeOther: z.string().optional(),
  features: z.array(z.string()).optional(),
  impression: z.string().optional(),
  impressionOther: z.string().optional(),
  style: z.string().optional(),
  styleOther: z.string().optional(),
  outfitTop: z.string().optional(),
  outfitTopOther: z.string().optional(),
  outfitBottom: z.string().optional(),
  outfitBottomOther: z.string().optional(),
  shoes: z.string().optional(),
  shoesOther: z.string().optional(),
  lingerieMainType: z.string().optional(),
  lingerieMainTypeOther: z.string().optional(),
  lingerieTopType: z.string().optional(),
  lingerieTopTypeOther: z.string().optional(),
  lingerieBottomType: z.string().optional(),
  lingerieBottomTypeOther: z.string().optional(),
  lingerieBodyType: z.string().optional(),
  lingerieBodyTypeOther: z.string().optional(),
  lingerieBrandsDropdown: z.string().optional(),
  lingerieBrandsDropdownOther: z.string().optional(),
  lingerieStyle: z.string().optional(),
  lingerieStyleOther: z.string().optional(),
  lingerieMaterial: z.string().optional(),
  lingerieMaterialOther: z.string().optional(),
  lingerieColor: z.string().optional(),
  lingerieDetails: z.string().optional(),
  isSexyLingerie: z.boolean().default(false),
  sexyLingerieDetails: z.string().optional(),
  sexyLingerieDetailsOther: z.string().optional(),
  personality: z.string().optional(),
  backstory: z.string().optional(),
});

type CharacterFormValues = z.infer<typeof characterFormSchema>;

export default function CharacterCreatePage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(characterFormSchema),
    defaultValues: {
      features: [],
      bodyHair: [],
      isSexyLingerie: false,
    },
  });

  const { watch, setValue, getValues } = form;
  const gender = watch('gender');
  const role = watch('role');
  const build = watch('build');
  const hairColor = watch('hairColor');
  const hairStyle = watch('hairStyle');
  const eyes = watch('eyes');
  const facialHair = watch('facialHair');
  const breastsCup = watch('breastsCup');
  const breastsShape = watch('breastsShape');
  const buttocksSize = watch('buttocksSize');
  const buttocksShape = watch('buttocksShape');
  const impression = watch('impression');
  const style = watch('style');
  const outfitTop = watch('outfitTop');
  const outfitBottom = watch('outfitBottom');
  const shoes = watch('shoes');
  const lingerieMainType = watch('lingerieMainType');
  const lingerieTopType = watch('lingerieTopType');
  const lingerieBottomType = watch('lingerieBottomType');
  const lingerieBodyType = watch('lingerieBodyType');
  const lingerieBrands = watch('lingerieBrandsDropdown');
  const lingerieStyle = watch('lingerieStyle');
  const lingerieMaterial = watch('lingerieMaterial');
  const isSexyLingerie = watch('isSexyLingerie');
  const sexyLingerieDetails = watch('sexyLingerieDetails');
  
  async function handleAiField(fieldId: keyof CharacterFormValues) {
    try {
      const response = await generateAiFieldContent({
        fieldId,
        gender: getValues('gender') || 'onbekend',
        age: getValues('age') || 'onbekende leeftijd',
        job: getValues('job'),
      });

      if (response.content) {
        if (fieldId === 'features' || fieldId === 'bodyHair') {
            const currentValues = getValues(fieldId) || [];
            setValue(fieldId, [...currentValues, response.content]);
        } else {
             setValue(fieldId as any, response.content, { shouldValidate: true });
        }
        toast({ title: 'Veld gegenereerd!', description: `Veld '${fieldId}' is bijgewerkt.` });
      }
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Fout', description: e.message });
    }
  }

  async function handleAiCategory(sectionId: string) {
    try {
      const { categoryData } = await aiFillCharacterCategories({
        sectionId,
        currentGender: getValues('gender') || 'onbekend',
        currentAge: getValues('age') || 'onbekende leeftijd',
      });
      
      for (const [key, value] of Object.entries(categoryData as any)) {
         if (key === 'features' || key === 'bodyHair') {
            const items = (value as string).split(',').map(s => s.trim()).filter(Boolean);
            setValue(key, items, { shouldValidate: true });
         } else {
            setValue(key as any, value, { shouldValidate: true });
         }
      }
      toast({ title: 'Categorie gegenereerd!', description: `Sectie '${sectionId}' is bijgewerkt.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Fout', description: e.message });
    }
  }

  async function onSubmit(data: CharacterFormValues) {
    setIsGenerating(true);

    try {
      const response = await generateCharacterDetails(data);

      const newCharacter = {
          ...data,
          id: Date.now().toString(),
          description: response.characterDetails,
          imageUrl: '', 
          imageHint: data.gender === 'Man' ? 'male portrait' : 'female portrait',
      };
      
      mockCharacters.push(newCharacter);
      
      toast({ title: 'Personage gecreëerd!', description: `${data.name} is toegevoegd aan je personages.` });
      router.push('/characters/overview');

    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Fout bij genereren', description: e.message });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="p-6 md:p-8">
      <nav className="mb-6">
        <Link
          href="/characters/overview"
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Personages
        </Link>
      </nav>
      <header className="mb-6">
        <h1 className="text-2xl font-bold font-headline">
          Nieuw Personage Creëren
        </h1>
      </header>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormSection title="1. Basisgegevens" action={
              <AiButton
                tooltip="Genereer hele categorie"
                onClick={() => handleAiCategory('base-section')}
              />
            }>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam *</FormLabel>
                   <div className="relative flex items-center">
                    <FormControl><Input placeholder="Bijv: 'Elara Vex'" {...field} /></FormControl>
                     <AiButton className="absolute right-2" tooltip="Genereer naam" onClick={() => handleAiField('name')} />
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="age" render={({ field }) => (
                <FormItem>
                  <FormLabel>Leeftijd / Range</FormLabel>
                  <div className="relative flex items-center">
                    <FormControl><Input placeholder="Bijv: '28', 'Tussen 18-20'" {...field} /></FormControl>
                    <AiButton className="absolute right-2" tooltip="Genereer leeftijd" onClick={() => handleAiField('age')} />
                  </div>
                </FormItem>
              )} />
              <FormField control={form.control} name="gender" render={({ field }) => (
                <FormItem>
                  <FormLabel>Geslacht/Gender *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Kies een optie..." /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Man">Man</SelectItem>
                      <SelectItem value="Vrouw">Vrouw</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol in verhaal</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Kies een rol (optioneel)" /></SelectTrigger></FormControl>
                    <SelectContent>{dropdownOptions.shared.roles.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                  {role === 'Anders' && 
                    <div className="w-full pt-2">
                        <FormField control={form.control} name="roleOther" render={({ field }) => (
                            <FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer rol</FormLabel><FormControl><Input placeholder="Specificeer rol" {...field} /></FormControl></FormItem>
                        )} />
                    </div>
                  }
                </FormItem>
              )} />
              
              <FormField control={form.control} name="job" render={({ field }) => (
                <FormItem>
                  <FormLabel>Beroep / Studie</FormLabel>
                  <div className="relative flex items-center">
                    <FormControl><Input placeholder="Bijv: 'Student', 'Hacker'" {...field} /></FormControl>
                    <AiButton className="absolute right-2" tooltip="Genereer beroep" onClick={() => handleAiField('job')} />
                  </div>
                </FormItem>
              )} />
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>Woonplaats / Omgeving</FormLabel>
                  <div className="relative flex items-center">
                    <FormControl><Input placeholder="Bijv: 'Grote stad', 'Rustig dorp'" {...field} /></FormControl>
                    <AiButton className="absolute right-2" tooltip="Genereer locatie" onClick={() => handleAiField('location')} />
                  </div>
                </FormItem>
              )} />
            </FormSection>

            <Separator />
            
            <FormSection title="2. Uiterlijk" action={
              <AiButton tooltip="Genereer hele categorie" onClick={() => handleAiCategory('appearance-section')} disabled={!gender}/>
            }>
                <div className="flex items-center space-x-2">
                    <FormField control={form.control} name="lengthM" render={({ field }) => (
                        <FormItem className="flex-1"><FormLabel>Lengte (m)</FormLabel><FormControl><Input type="number" placeholder="1" {...field} /></FormControl></FormItem>
                    )} />
                    <span className="text-gray-500 text-lg pt-8">,</span>
                    <FormField control={form.control} name="lengthCm" render={({ field }) => (
                        <FormItem className="flex-1"><FormLabel>(cm)</FormLabel><FormControl><Input type="number" placeholder="80" {...field} /></FormControl></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="build" render={({ field }) => (
                  <FormItem><FormLabel>Lichaamsbouw</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                      <SelectContent>{dropdownOptions.shared.bodyBuild.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                     {build === 'Anders' && 
                        <div className="w-full pt-2">
                            <FormField control={form.control} name="buildOther" render={({ field }) => (
                                <FormItem className="w-full"><FormLabel className="text-xs text-muted-foreground">Specificeer lichaamsbouw</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                            )} />
                        </div>
                    }
                  </FormItem>
                )} />
                
                {gender === 'Vrouw' && <>
                    <FormField control={form.control} name="breastsCup" render={({ field }) => (
                        <FormItem><FormLabel>Borsten - Cupmaat</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                            <SelectContent>{dropdownOptions.Vrouw.breastsCup.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        {breastsCup === 'Anders' && <div className="pt-2"><FormField control={form.control} name="breastsCupOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer cupmaat</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="breastsShape" render={({ field }) => (
                        <FormItem><FormLabel>Borsten - Vorm</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                            <SelectContent>{dropdownOptions.Vrouw.breastsShape.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        {breastsShape === 'Anders' && <div className="pt-2"><FormField control={form.control} name="breastsShapeOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer vorm</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="buttocksSize" render={({ field }) => (
                        <FormItem><FormLabel>Billen - Grootte</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                            <SelectContent>{dropdownOptions.Vrouw.buttocksSize.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        {buttocksSize === 'Anders' && <div className="pt-2"><FormField control={form.control} name="buttocksSizeOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer grootte</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="buttocksShape" render={({ field }) => (
                        <FormItem><FormLabel>Billen - Vorm</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                            <SelectContent>{dropdownOptions.Vrouw.buttocksShape.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        {buttocksShape === 'Anders' && <div className="pt-2"><FormField control={form.control} name="buttocksShapeOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer vorm</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                        </FormItem>
                    )} />
                </>}
                
                <FormField control={form.control} name="hairColor" render={({ field }) => (
                  <FormItem><FormLabel>Haarkleur</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                      <SelectContent>{dropdownOptions.shared.hairColor.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                    {hairColor === 'Anders' && <div className="pt-2"><FormField control={form.control} name="hairColorOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer haarkleur</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="hairStyle" render={({ field }) => (
                  <FormItem><FormLabel>Haarstijl</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!gender}><FormControl><SelectTrigger><SelectValue placeholder={gender ? "Kies..." : "Kies eerst geslacht"} /></SelectTrigger></FormControl>
                      <SelectContent>{(gender ? dropdownOptions[gender]?.hairStyle || [] : []).map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                    {hairStyle === 'Anders' && <div className="pt-2"><FormField control={form.control} name="hairStyleOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer haarstijl</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                  </FormItem>
                )} />

                <FormField control={form.control} name="eyes" render={({ field }) => (
                  <FormItem><FormLabel>Oogkleur</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                      <SelectContent>{dropdownOptions.shared.eyeColor.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                     {eyes === 'Anders' && <div className="pt-2"><FormField control={form.control} name="eyesOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer oogkleur</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                  </FormItem>
                )} />
                
                {gender === 'Vrouw' && (
                  <FormField control={form.control} name="impression" render={({ field }) => (
                    <FormItem><FormLabel>Eerste Indruk</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                        <SelectContent>{dropdownOptions.shared.impression.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                      </Select>
                      {impression === 'Anders' && <div className="pt-2"><FormField control={form.control} name="impressionOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer eerste indruk</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                    </FormItem>
                  )} />
                )}

                <Controller control={form.control} name="features" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opvallende Kenmerken</FormLabel>
                      <div className="relative flex items-center">
                        <TagInput {...field} placeholder="Typ kenmerk en druk op Enter..." />
                        <AiButton className="absolute right-2" tooltip="Genereer kenmerk" onClick={() => handleAiField('features')} />
                      </div>
                  </FormItem>
                )} />

                {gender === 'Man' && <>
                    <FormField control={form.control} name="facialHair" render={({ field }) => (
                        <FormItem><FormLabel>Gezichtsbeharing</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                            <SelectContent>{dropdownOptions.Man.facialHair.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        {facialHair === 'Anders' && <div className="pt-2"><FormField control={form.control} name="facialHairOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer gezichtsbeharing</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="impression" render={({ field }) => (
                      <FormItem><FormLabel>Eerste Indruk</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                          <SelectContent>{dropdownOptions.shared.impression.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        {impression === 'Anders' && <div className="pt-2"><FormField control={form.control} name="impressionOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer eerste indruk</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                      </FormItem>
                    )} />
                     <Controller control={form.control} name="bodyHair" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lichaamsbeharing</FormLabel>
                          <div className="relative flex items-center">
                            <TagInput 
                              {...field} 
                              placeholder="Plek, bv: Borst (druk Enter)"
                              mode="key-value"
                              keyPlaceholder="Plek..."
                              valuePlaceholder="Hoeveelheid..."
                            />
                            <AiButton className="absolute right-2" tooltip="Genereer lichaamsbeharing" onClick={() => handleAiField('bodyHair')} />
                          </div>
                          <FormDescription>Voeg plek en hoeveelheid toe.</FormDescription>
                      </FormItem>
                    )} />
                </>}
            </FormSection>

            <Separator />
            
            <FormSection title="3. Kleding" action={
              <AiButton tooltip="Genereer hele categorie" onClick={() => handleAiCategory('clothing-section')} disabled={!gender}/>
            }>
               <FormField control={form.control} name="style" render={({ field }) => (
                  <FormItem><FormLabel>Algemene Kledingstijl</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                      <SelectContent>{dropdownOptions.shared.clothingStyle.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                    {style === 'Anders' && <div className="pt-2"><FormField control={form.control} name="styleOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer stijl</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                  </FormItem>
                )} />

                <FormField control={form.control} name="outfitTop" render={({ field }) => (
                  <FormItem><FormLabel>Bovenkleding</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!gender}><FormControl><SelectTrigger><SelectValue placeholder={gender ? "Kies..." : "Kies eerst geslacht"} /></SelectTrigger></FormControl>
                      <SelectContent>{(gender ? dropdownOptions[gender]?.outfitTop || [] : []).map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                    {outfitTop === 'Anders' && <div className="pt-2"><FormField control={form.control} name="outfitTopOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer bovenkleding</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                  </FormItem>
                )} />

                <FormField control={form.control} name="outfitBottom" render={({ field }) => (
                  <FormItem><FormLabel>Onderkleding</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!gender}><FormControl><SelectTrigger><SelectValue placeholder={gender ? "Kies..." : "Kies eerst geslacht"} /></SelectTrigger></FormControl>
                      <SelectContent>{(gender ? dropdownOptions[gender]?.outfitBottom || [] : []).map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                    {outfitBottom === 'Anders' && <div className="pt-2"><FormField control={form.control} name="outfitBottomOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer onderkleding</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                  </FormItem>
                )} />

                <FormField control={form.control} name="shoes" render={({ field }) => (
                  <FormItem><FormLabel>Schoeisel</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!gender}><FormControl><SelectTrigger><SelectValue placeholder={gender ? "Kies..." : "Kies eerst geslacht"} /></SelectTrigger></FormControl>
                      <SelectContent>{(gender ? dropdownOptions[gender]?.shoes || [] : []).map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                    {shoes === 'Anders' && <div className="pt-2"><FormField control={form.control} name="shoesOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer schoeisel</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                  </FormItem>
                )} />
            </FormSection>

            {gender === 'Vrouw' && <>
              <Separator />
              <FormSection title="Lingerie Details">
                  <FormField control={form.control} name="lingerieMainType" render={({ field }) => (
                      <FormItem className="md:col-span-2"><FormLabel>Lingerie Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Lingeriesetje">Lingeriesetje</SelectItem>
                            <SelectItem value="Alleen Bovenstuk">Alleen Bovenstuk</SelectItem>
                            <SelectItem value="Alleen Onderstuk">Alleen Onderstuk</SelectItem>
                            <SelectItem value="Body, korset, enzv.">Body, korset, enzv.</SelectItem>
                            <SelectItem value="Anders">Anders</SelectItem>
                          </SelectContent>
                      </Select>
                      {lingerieMainType === 'Anders' && <div className="pt-2"><FormField control={form.control} name="lingerieMainTypeOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer type</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                      </FormItem>
                  )} />


                  {(lingerieMainType === 'Lingeriesetje' || lingerieMainType === 'Alleen Bovenstuk') && <>
                      <FormField control={form.control} name="lingerieTopType" render={({ field }) => (
                          <FormItem><FormLabel>Type Bovenstuk (BH)</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                              <SelectContent>{dropdownOptions.Vrouw.lingerieTopType.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                          </Select>
                          {lingerieTopType === 'Anders' && <div className="pt-2"><FormField control={form.control} name="lingerieTopTypeOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer bovenstuk</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                          </FormItem>
                      )} />
                      
                  </>}
                  {(lingerieMainType === 'Lingeriesetje' || lingerieMainType === 'Alleen Onderstuk') && <>
                      <FormField control={form.control} name="lingerieBottomType" render={({ field }) => (
                          <FormItem><FormLabel>Type Onderstuk</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                              <SelectContent>{dropdownOptions.Vrouw.lingerieBottomType.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                          </Select>
                           {lingerieBottomType === 'Anders' && <div className="pt-2"><FormField control={form.control} name="lingerieBottomTypeOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer onderstuk</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                          </FormItem>
                      )} />
                  </>}
                   {lingerieMainType === 'Body, korset, enzv.' && (
                    <>
                      <FormField
                        control={form.control}
                        name="lingerieBodyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specificeer Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Kies..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {dropdownOptions.Vrouw.bodyType.map((o) => (
                                  <SelectItem key={o} value={o}>
                                    {o}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                             {lingerieBodyType === 'Anders' && (
                                <div className="pt-2">
                                <FormField
                                  control={form.control}
                                  name="lingerieBodyTypeOther"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-xs text-muted-foreground">Specificeer ander type</FormLabel>
                                      <div className="relative flex items-center">
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                        <AiButton
                                          className="absolute right-2"
                                          tooltip="Genereer type"
                                          onClick={() => handleAiField('lingerieBodyTypeOther')}
                                        />
                                      </div>
                                    </FormItem>
                                  )}
                                />
                                </div>
                              )}
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField control={form.control} name="lingerieStyle" render={({ field }) => (
                      <FormItem><FormLabel>Stijl</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                          <SelectContent>{dropdownOptions.Vrouw.lingerieStyle.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                      </Select>
                      {lingerieStyle === 'Anders' && <div className="pt-2"><FormField control={form.control} name="lingerieStyleOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer stijl</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                      </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="lingerieMaterial" render={({ field }) => (
                      <FormItem><FormLabel>Materiaal</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                          <SelectContent>{dropdownOptions.Vrouw.lingerieMaterial.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                      </Select>
                      {lingerieMaterial === 'Anders' && <div className="pt-2"><FormField control={form.control} name="lingerieMaterialOther" render={({ field }) => (<FormItem><FormLabel className="text-xs text-muted-foreground">Specificeer materiaal</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></div>}
                      </FormItem>
                  )} />

                  <FormField control={form.control} name="lingerieColor" render={({ field }) => (<FormItem><FormLabel>Kleurenschema</FormLabel>
                    <div className="relative flex items-center">
                        <FormControl><Input placeholder="Zwart, wit, pasteltinten" {...field} /></FormControl>
                        <AiButton className="absolute right-2" tooltip="Genereer kleurenschema" onClick={() => handleAiField('lingerieColor')} />
                    </div>
                  </FormItem>)} />
                  <FormField control={form.control} name="lingerieDetails" render={({ field }) => (<FormItem><FormLabel>Patronen / Details</FormLabel>
                     <div className="relative flex items-center">
                        <FormControl><Input placeholder="Kant, strikjes, mesh" {...field} /></FormControl>
                        <AiButton className="absolute right-2" tooltip="Genereer details" onClick={() => handleAiField('lingerieDetails')} />
                    </div>
                  </FormItem>)} />
                  
                  <FormField
                    control={form.control}
                    name="isSexyLingerie"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm md:col-span-2">
                        <div className="space-y-0.5">
                          <FormLabel>Sexy Lingerie?</FormLabel>
                          <FormDescription>
                            Draagt dit personage vaak uitdagende lingerie?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {isSexyLingerie && (
                    <>
                      <FormField
                        control={form.control}
                        name="sexyLingerieDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Wat maakt het sexy?</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Kies een detail..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {dropdownOptions.Vrouw.sexyLingerieDetails.map(
                                  (o) => (
                                    <SelectItem key={o} value={o}>
                                      {o}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            {sexyLingerieDetails === 'Anders' && (
                                <div className="pt-2">
                                <FormField
                                control={form.control}
                                name="sexyLingerieDetailsOther"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">Specificeer sexy detail</FormLabel>
                                    <div className="relative flex items-center">
                                        <FormControl>
                                        <Input {...field} />
                                        </FormControl>
                                        <AiButton
                                        className="absolute right-2"
                                        tooltip="Genereer detail"
                                        onClick={() => handleAiField('sexyLingerieDetailsOther')}
                                        />
                                    </div>
                                    </FormItem>
                                )}
                                />
                                </div>
                            )}
                          </FormItem>
                        )}
                      />
                    </>
                  )}


                   <FormField control={form.control} name="lingerieBrandsDropdown" render={({ field }) => (
                      <FormItem><FormLabel>Favoriete Merken</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Kies..." /></SelectTrigger></FormControl>
                          <SelectContent>{dropdownOptions.Vrouw.lingerieBrands.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                      </Select>
                      {lingerieBrands === 'Anders' && <div className="pt-2"><FormField control={form.control} name="lingerieBrandsDropdownOther" render={({ field }) => (<FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Specificeer merk</FormLabel>
                        <div className="relative flex items-center">
                            <FormControl><Input {...field} /></FormControl>
                            <AiButton className="absolute right-2" tooltip="Genereer merk" onClick={() => handleAiField('lingerieBrandsDropdownOther')} />
                        </div>
                      </FormItem>)} /></div>}
                      </FormItem>
                  )} />
              </FormSection>
            </>}
            
            <Separator />

            <FormSection title="4. Details" action={
              <AiButton tooltip="Genereer hele categorie" onClick={() => handleAiCategory('details-section')} />
            }>
              <FormField control={form.control} name="personality" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Persoonlijkheid</FormLabel>
                    <div className="relative flex items-center">
                        <FormControl><Textarea rows={3} placeholder="Beschrijf hun persoonlijkheid..." {...field} /></FormControl>
                        <AiButton className="absolute right-2 top-2" tooltip="Genereer persoonlijkheid" onClick={() => handleAiField('personality')} />
                    </div>
                  </FormItem>
              )} />
              <FormField control={form.control} name="backstory" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Achtergrond</FormLabel>
                    <div className="relative flex items-center">
                        <FormControl><Textarea rows={3} placeholder="Beschrijf hun achtergrondverhaal..." {...field} /></FormControl>
                        <AiButton className="absolute right-2 top-2" tooltip="Genereer achtergrond" onClick={() => handleAiField('backstory')} />
                    </div>
                  </FormItem>
              )} />
            </FormSection>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="ghost" onClick={() => form.reset()}>
                Annuleren
              </Button>
              <Button type="submit" disabled={isGenerating} className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                 {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Bezig...</> : 'Genereer Personage'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
