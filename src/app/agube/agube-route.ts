export enum AgubeRoute {
  // User options
  CONTROL_PANEL = 'control-panel',
  CONFIG = 'config',
  // Dwelling options
  DWELLING = 'viviendas',
  CREATE_DWELLING = 'viviendas/alta/vivienda',
  CHANGE_PAYMASTER = 'vivienda/cambio/pagador',
  CHANGE_WATER_METER = 'vivienda/cambio/contador',
  CHANGE_RESIDENT = 'vivienda/resident',
  CHANGE_OWNER = 'vivienda/propietario',
  // Reservoir options
  RESERVOIR = 'depositos',
  CHANGE_RESERVOIR = 'depositos/changeReservoir',
  CREATE_RESERVOIR = 'depositos/alta/deposito',
}
