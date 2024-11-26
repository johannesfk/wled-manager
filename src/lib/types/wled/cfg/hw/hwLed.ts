export interface Led {
  /**
   * get total legth; no longer read as of WLED 14.0, but provided for compatibility on downgrade
   */
  total?: number;
  /**
   * max milliamps
   */
  maxpwr?: number;
  /**
   * milliamps per LED
   */
  ledma?: number;
  /**
   * CCT color correction of RGB color
   */
  cct?: number;
  
}