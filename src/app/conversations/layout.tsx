import getConversations from '@/actions/getConversations';
import { ConversationList } from '@/components/ConversationList';
import Sidebar from '@/components/sidebar/Sidebar';

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
