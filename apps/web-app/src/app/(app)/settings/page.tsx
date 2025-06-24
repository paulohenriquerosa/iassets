import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomAlerts } from "./custom-alerts";

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-foreground font-bold">Configurações</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e preferências.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" defaultValue="João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" defaultValue="joao@exemplo.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Moeda Principal</Label>
                <Select defaultValue="brl">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                    <SelectItem value="usd">Dólar Americano ($)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="tax-calculation">Cálculo de Impostos</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar cálculo automático de impostos sobre ganhos
                  </p>
                </div>
                <Switch id="tax-calculation" defaultChecked />
              </div>
              
              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <CustomAlerts />
          
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como e quando deseja receber notificações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba atualizações importantes por email.
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações em tempo real no seu navegador.
                    </p>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dividend-notifications">Alertas de Dividendos</Label>
                    <p className="text-sm text-muted-foreground">
                      Seja notificado sobre pagamentos de dividendos.
                    </p>
                  </div>
                  <Switch id="dividend-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="price-notifications">Alertas de Preço</Label>
                    <p className="text-sm text-muted-foreground">
                      Seja notificado sobre mudanças significativas de preço.
                    </p>
                  </div>
                  <Switch id="price-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência da aplicação.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <RadioGroup defaultValue="system">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light-theme" />
                    <Label htmlFor="light-theme">Claro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark-theme" />
                    <Label htmlFor="dark-theme">Escuro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system-theme" />
                    <Label htmlFor="system-theme">Sistema</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Visualização do Dashboard</Label>
                <Select defaultValue="cards">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cards">Cards</SelectItem>
                    <SelectItem value="compact">Compacto</SelectItem>
                    <SelectItem value="detailed">Detalhado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button>Aplicar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>
                Conecte-se a corretoras e serviços financeiros.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                    <span className="font-bold text-primary">XP</span>
                  </div>
                  <div>
                    <h4 className="font-medium">XP Investimentos</h4>
                    <p className="text-sm text-muted-foreground">Conecte sua conta da XP</p>
                  </div>
                </div>
                <Button variant="outline">Conectar</Button>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                    <span className="font-bold text-primary">NU</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Nuinvest</h4>
                    <p className="text-sm text-muted-foreground">Conecte sua conta da Nuinvest</p>
                  </div>
                </div>
                <Button variant="outline">Conectar</Button>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                    <span className="font-bold text-primary">B3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">B3 (CEI)</h4>
                    <p className="text-sm text-muted-foreground">Importe dados do Canal Eletrônico do Investidor</p>
                  </div>
                </div>
                <Button variant="outline">Conectar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
