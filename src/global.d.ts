declare global {
  interface Window {
    ACMS: {
      Ready: () => void,
      Config: {
        root: string,
        LiteEditorConf: {
          btnOptions: {
            label: string,
            group: string,
            action: string,
            onClick:(editor: any) => void
          }[]
        }
      }
      addListener: any
    }
    csrfToken: string
  }
}

export {};
