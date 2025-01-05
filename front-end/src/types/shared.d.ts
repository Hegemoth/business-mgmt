export type uuid = string;

type DateType = Date | string;

interface Audit {
  audit: {
    creator: uuid;
    updater: uuid;
    created: DateType;
    updated: DateType;
  };
}

type Severity =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'warning'
  | 'success';
