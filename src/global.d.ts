declare global {
  interface Window {
    ACMS: {
      Ready: () => void,
      Library: {
        dialog: {
          alert: (message: string) => Promise<void>,
        },
      },
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
      removeListener?: any
    }
    csrfToken?: string
  }
}

export {};
