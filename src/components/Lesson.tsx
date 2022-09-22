import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export const Lesson = ({ availableAt, type, title, slug }: LessonProps) => {
  const { slug: slugParam } = useParams<{ slug: string }>()

  const isActive = slugParam === slug;

  console.log(slugParam);

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>
      <div className={`rounded border border-gray-500 p-4 mt-2  transition-colors ${isActive ? "bg-green-500" : "group-hover:border-green-500"}`}>
        <header className="flex items-center justify-between">
            {
              isLessonAvailable ? (
                <span className={`text-sm  font-medium flex items-center gap-2 ${isActive ? "text-white" : "text-blue-500"}`}>
                <CheckCircle size={20}/>
                Conteúdo Liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20}/>
                Em Breve
              </span>
              )
            }
          <span className={`text-xs rounded px-2 py[0.125rem] text-white border ${isActive ? "border-white" : "border-green-300"}  font-bold`}>{
            type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'
          }</span>
        </header>
        <strong className={`${isActive ? "text-white" : "text-gray-200"} mt-5 block`}>{title}</strong>
      </div>
    </Link>
  )
}
