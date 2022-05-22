export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative mx-0.5 mt-1 mb-5 md:mx-3 shadow-lg rounded-lg bg-white p-4  border border-gray-100'>
      {children}
    </div>
  );
};

export const NamedCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Card>
      <div className='text-2xl mb-2 font-bold'>{title}</div>
      <div>{children}</div>
    </Card>
  );
};
