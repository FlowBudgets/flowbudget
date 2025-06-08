import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function FlowBudgetApp() {
  const [revenu, setRevenu] = useState(0);
  const [depensesFixes, setDepensesFixes] = useState([]);
  const [depensesVariables, setDepensesVariables] = useState([]);
  const [nouvelleDepense, setNouvelleDepense] = useState("");
  const [montantDepense, setMontantDepense] = useState("");
  const [typeDepense, setTypeDepense] = useState("fixe");

  const totalFixes = depensesFixes.reduce((acc, d) => acc + parseFloat(d.montant), 0);
  const totalVariables = depensesVariables.reduce((acc, d) => acc + parseFloat(d.montant), 0);
  const disponible = revenu - totalFixes - totalVariables;
  const epargneConseillee = Math.max(0, Math.floor(disponible * 0.3));

  const ajouterDepense = () => {
    const nouvelle = { nom: nouvelleDepense, montant: montantDepense };
    if (typeDepense === "fixe") setDepensesFixes([...depensesFixes, nouvelle]);
    else setDepensesVariables([...depensesVariables, nouvelle]);
    setNouvelleDepense("");
    setMontantDepense("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">FlowBudget – Gestion des dépenses quotidiennes</h1>

      <Card className="mb-4">
        <CardContent className="space-y-2 pt-4">
          <label>Revenu mensuel :</label>
          <Input
            type="number"
            value={revenu}
            onChange={(e) => setRevenu(parseFloat(e.target.value) || 0)}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="fixe" className="mb-4">
        <TabsList>
          <TabsTrigger value="fixe" onClick={() => setTypeDepense("fixe")}>Dépense fixe</TabsTrigger>
          <TabsTrigger value="variable" onClick={() => setTypeDepense("variable")}>Dépense variable</TabsTrigger>
        </TabsList>
        <TabsContent value="fixe">
          <CardContent className="space-y-2 pt-4">
            <Input
              placeholder="Nom de la dépense"
              value={nouvelleDepense}
              onChange={(e) => setNouvelleDepense(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Montant (€)"
              value={montantDepense}
              onChange={(e) => setMontantDepense(e.target.value)}
            />
            <Button onClick={ajouterDepense}>Ajouter</Button>
          </CardContent>
        </TabsContent>
        <TabsContent value="variable">
          <CardContent className="space-y-2 pt-4">
            <Input
              placeholder="Nom de la dépense"
              value={nouvelleDepense}
              onChange={(e) => setNouvelleDepense(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Montant (€)"
              value={montantDepense}
              onChange={(e) => setMontantDepense(e.target.value)}
            />
            <Button onClick={ajouterDepense}>Ajouter</Button>
          </CardContent>
        </TabsContent>
      </Tabs>

      <Card className="mb-4">
        <CardContent className="pt-4">
          <h2 className="font-bold">Résumé</h2>
          <p>Dépenses fixes : {totalFixes} €</p>
          <p>Dépenses variables : {totalVariables} €</p>
          <p>Disponible : {disponible} €</p>
          <p>Épargne conseillée (30%) : {epargneConseillee} €</p>
        </CardContent>
      </Card>
    </div>
  );
}
