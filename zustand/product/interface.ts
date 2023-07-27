export enum PRODUCT_TYPE {
  IMPLANT = 'implant',
  ABUTMENT = 'abutment',
  HEALING_ABUTMENT = 'healingAbutment',
  TEMPORARY_ABUTMENT = 'temporaryAbutment',
  IMPRESSION = 'impression',
  TOOLS = 'tools',
}

export enum AREA_TYPE {
  ROOT = 'root',
  CROWN = 'crown',
}

export enum TABGROUP_TYPE {
  IMPLANT_GROUP = 'implantGroup',
  ABUTMENT_GROUP = 'abutmentGroup',
  CROWN_GROUP = 'crownGroup',
  NO_GROUP = 'noGroup',
}

export enum INDICATION {
  CROWN = 'crown',
  BRIDGE = 'bridge',
  PROSTHESIS = 'prosthesis',
}

export interface ProductFilterCategory {
  displayName: string;
  fqlxKey: string;
  options: string[];
  suffix: string;
  prefix: string;
  dataType: string;
}
