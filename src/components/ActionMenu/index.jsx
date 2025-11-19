import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import * as S from './styles.js';

function ActionMenu({ children }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <S.IconButton aria-label="Ações">
          <HiDotsVertical />
        </S.IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <S.Content align="end" sideOffset={5}>
          {children}
        </S.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export const ActionMenuItem = S.Item;

export default ActionMenu;