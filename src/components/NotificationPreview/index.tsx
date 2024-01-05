import { Text } from 'react-native';
import { mapData } from '../../utils/mapData';
import FeedLayout from './Layout/FeedLayout';
import MessageTemplate from './MessageTemplate';
import restoreNumbersFromUiTemplate from './utils/restoreNumbersFromUITemplate';
import selectTheme from './utils/selectTheme';

import type { NotificationTemplate, TemplateData, ThemeValues } from '../../types/notification';

type NotificationProps = {
  theme: ThemeValues;
  label?: string;
  uiTemplate: NotificationTemplate['ui_template'];
  templateVariables: TemplateData;
  colorVariables: NotificationTemplate['color_variables'];
  themeMode?: 'light' | 'dark';
  createdAt?: number;
  isUnread?: boolean;
  customImageComponent?: (props: any) => React.ReactNode;
};

export function NotificationPreview({
  theme,
  label,
  uiTemplate,
  templateVariables,
  colorVariables,
  themeMode = 'light',
  createdAt,
  isUnread,
  customImageComponent,
}: NotificationProps) {
  const selectedThemeColorVariables = selectTheme({
    theme: colorVariables,
    themeMode,
  });

  console.log(selectedThemeColorVariables);

  const parsedTemplate = mapData({
    template: restoreNumbersFromUiTemplate(uiTemplate) as any,
    source: { ...templateVariables, ...selectedThemeColorVariables },
  });
  console.log(parsedTemplate);

  return (
    <FeedLayout theme={theme} label={label} createdAt={createdAt} isUnread={isUnread}>
      <MessageTemplate theme={theme} templateItems={parsedTemplate.body.items} customImageComponent={customImageComponent} />
    </FeedLayout>
  );
}
