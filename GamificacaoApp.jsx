import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Coins, Upload, Trophy, Gift } from "lucide-react";

const tasksList = [
  { id: 1, title: "Estudar o conteúdo digital por 1h", value: 4 },
  { id: 2, title: "Baixar o PDF do conteúdo digital e enviar print", value: 6 },
  { id: 3, title: "Verificar e-mail e responder pesquisa NPS", value: 4 },
  { id: 4, title: "Enviar print da resposta da pesquisa NPS ou não eleito", value: 6 },
  { id: 5, title: "Responder a pesquisa ISA", value: 4 },
  { id: 6, title: "Enviar print da pesquisa ISA concluída", value: 6 },
  { id: 7, title: "Participar de seletivo de liga da Fisioterapia", value: 10 },
  { id: 8, title: "Ser aprovado em seletivo de liga da Fisioterapia", value: 10 },
  { id: 9, title: "Participar de atividades da Atlética Reabilita", value: 10 },
  { id: 10, title: "Apresentar banner em eventos institucionais (EIFISIO, FISIO Science ou JAIMP)", value: 20 },
  { id: 11, title: "Aumentar o CR para 9,6 ou mais", value: 50 }
];

const mockRanking = [
  { name: "Ana Silva", coins: 140 },
  { name: "Carlos Souza", coins: 120 },
  { name: "Rafaela Lima", coins: 95 }
];

const rewardsList = [
  { id: 1, label: "Certificado digital de destaque", cost: 50 },
  { id: 2, label: "Camisa oficial da Atlética", cost: 100 },
  { id: 3, label: "Kit acadêmico exclusivo", cost: 150 },
  { id: 4, label: "5% de desconto na mensalidade no semestre vigente", cost: 200 },
  { id: 5, label: "10% de desconto na mensalidade no semestre vigente", cost: 250 },
  { id: 6, label: "15% de desconto na mensalidade no semestre vigente", cost: 275 },
  { id: 7, label: "Bolsa de estudos para curso livre ou inscrição em Congresso de Fisioterapia", cost: 300 }
];

export default function GamificacaoApp() {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState(tasksList);
  const [coins, setCoins] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [uploads, setUploads] = useState({});
  const [claimedRewards, setClaimedRewards] = useState([]);

  const handleLogin = () => {
    if (!matricula.trim() || !nome.trim()) return;
    setIsLoggedIn(true);
  };

  const handleComplete = (taskId, file) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && !completed.includes(taskId)) {
      setCoins(coins + task.value);
      setCompleted([...completed, taskId]);
      if (file) {
        setUploads({ ...uploads, [taskId]: file.name });
      }
    }
  };

  const handleRedeem = (reward) => {
    if (coins >= reward.cost && !claimedRewards.includes(reward.id)) {
      setCoins(coins - reward.cost);
      setClaimedRewards([...claimedRewards, reward.id]);
      alert(`Recompensa resgatada: ${reward.label}`);
    }
  };

  const progress = Math.min((coins / 300) * 100, 100);

  if (!isLoggedIn) {
    return (
      <div className="p-6 max-w-md mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold">Login com Nome e E-mail Institucional</h1>
        <Input
          placeholder="Digite seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          placeholder="Digite seu e-mail institucional"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <Button onClick={handleLogin}>Entrar</Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Missões do Semestre 🐍</h1>
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">SnakeCoins:</p>
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5" />
          <span className="text-xl font-semibold">{coins}</span>
        </div>
      </div>
      <Progress value={progress} />
      {tasks.map((task) => (
        <Card key={task.id} className="shadow-md">
          <CardContent className="space-y-3 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-500">Vale {task.value} SnakeCoins</p>
              </div>
              <Button
                disabled={completed.includes(task.id)}
                onClick={() => handleComplete(task.id)}
              >
                {completed.includes(task.id) ? "Concluído" : "Concluir"}
              </Button>
            </div>
            {!completed.includes(task.id) && (
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <Input
                  type="file"
                  onChange={(e) => handleComplete(task.id, e.target.files?.[0])}
                />
              </div>
            )}
            {uploads[task.id] && (
              <p className="text-sm text-green-600">Comprovante enviado: {uploads[task.id]}</p>
            )}
          </CardContent>
        </Card>
      ))}
      <div className="p-4 border rounded-xl shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5" /> Ranking Geral
        </h2>
        <ul className="space-y-1">
          <li className="flex justify-between font-semibold text-blue-700">
            <span>Você: {nome}</span>
            <span>{coins} 🐍</span>
          </li>
          {mockRanking.map((user, index) => (
            <li key={index} className="flex justify-between">
              <span>{index + 1}. {user.name}</span>
              <span>{user.coins} 🐍</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border rounded-xl shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5" /> Resgate de Recompensas
        </h2>
        <ul className="space-y-2">
          {rewardsList.map((reward) => (
            <li key={reward.id} className="flex justify-between items-center">
              <span>{reward.cost} 🐍 - {reward.label}</span>
              <Button
                size="sm"
                disabled={coins < reward.cost || claimedRewards.includes(reward.id)}
                onClick={() => handleRedeem(reward)}
              >
                {claimedRewards.includes(reward.id) ? "Resgatado" : "Resgatar"}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}