import { createContext } from 'react';
import * as vfatCore from '../../vfat/core';

export interface VFatContext {
  vfat: vfatCore.IVFatApp
}

const context = createContext<VFatContext>({
  vfat: null
});

export default context;
