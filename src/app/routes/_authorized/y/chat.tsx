import { ChatWidget } from '@/widgets/chat/ui/chat'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/y/chat')({
  component: ChatWidget,
})

