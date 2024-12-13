import { useFormDesigner } from './useFormDesigner';

export const useWorkbench = () => {
  const engine = useFormDesigner();
  return engine?.workbench;
};
