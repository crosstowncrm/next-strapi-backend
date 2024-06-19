import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginTranslateBatchTranslateJob
  extends Schema.CollectionType {
  collectionName: 'translate_batch_translate_jobs';
  info: {
    singularName: 'batch-translate-job';
    pluralName: 'batch-translate-jobs';
    displayName: 'Translate Batch Translate Job';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String;
    sourceLocale: Attribute.String;
    targetLocale: Attribute.String;
    entityIds: Attribute.JSON;
    status: Attribute.Enumeration<
      [
        'created',
        'setup',
        'running',
        'paused',
        'finished',
        'cancelled',
        'failed'
      ]
    > &
      Attribute.DefaultTo<'created'>;
    failureReason: Attribute.JSON;
    progress: Attribute.Float & Attribute.DefaultTo<0>;
    autoPublish: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::translate.batch-translate-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::translate.batch-translate-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    firstName: Attribute.String;
    lastName: Attribute.String;
    bio: Attribute.Text;
    credits: Attribute.Integer & Attribute.DefaultTo<0>;
    image: Attribute.Media;
    summaries: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::summary.summary'
    >;
    companies: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::company.company'
    >;
    tasks: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::task.task'
    >;
    leads: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::lead.lead'
    >;
    opportunities: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::opportunity.opportunity'
    >;
    contacts: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::contact.contact'
    >;
    boards: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::board.board'
    >;
    board: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'api::board.board'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBoardBoard extends Schema.CollectionType {
  collectionName: 'boards';
  info: {
    singularName: 'board';
    pluralName: 'boards';
    displayName: 'Board';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    description: Attribute.Text;
    favorite: Attribute.Boolean;
    favoritePosition: Attribute.Integer;
    icon: Attribute.Media;
    position: Attribute.Integer;
    title: Attribute.String;
    assigned_user: Attribute.Relation<
      'api::board.board',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    visibility: Attribute.Enumeration<['PUBLIC', 'PRIVATE', 'TEAM']>;
    shared_with_users: Attribute.Relation<
      'api::board.board',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    watched_by_users: Attribute.Relation<
      'api::board.board',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::board.board',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::board.board',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCampaignCampaign extends Schema.CollectionType {
  collectionName: 'campaigns';
  info: {
    singularName: 'campaign';
    pluralName: 'campaigns';
    displayName: 'Campaign';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    opportunities: Attribute.Relation<
      'api::campaign.campaign',
      'oneToMany',
      'api::opportunity.opportunity'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::campaign.campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::campaign.campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCompanyCompany extends Schema.CollectionType {
  collectionName: 'companies';
  info: {
    singularName: 'company';
    pluralName: 'companies';
    displayName: 'Company';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assigned_to: Attribute.Relation<
      'api::company.company',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    billing_city: Attribute.String;
    address: Attribute.Component<'components.address'>;
    description: Attribute.Text;
    email: Attribute.String;
    employees: Attribute.String;
    fax: Attribute.String;
    website: Attribute.String;
    opportunities: Attribute.Relation<
      'api::company.company',
      'oneToMany',
      'api::opportunity.opportunity'
    >;
    contacts: Attribute.Relation<
      'api::company.company',
      'manyToMany',
      'api::contact.contact'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::company.company',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::company.company',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactContact extends Schema.CollectionType {
  collectionName: 'contacts';
  info: {
    singularName: 'contact';
    pluralName: 'contacts';
    displayName: 'Contact';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    first_name: Attribute.String;
    last_name: Attribute.String;
    email: Attribute.String;
    label: Attribute.Enumeration<['client', 'partner', 'admin']>;
    opportunities: Attribute.Relation<
      'api::contact.contact',
      'manyToMany',
      'api::opportunity.opportunity'
    >;
    companies: Attribute.Relation<
      'api::contact.contact',
      'manyToMany',
      'api::company.company'
    >;
    birthday: Attribute.Date;
    assigned_to: Attribute.Relation<
      'api::contact.contact',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    followed_by: Attribute.Relation<
      'api::contact.contact',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    description: Attribute.Text;
    personal_email: Attribute.String;
    office_phone: Attribute.String;
    mobile_phone: Attribute.String;
    website: Attribute.String;
    position: Attribute.String;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    social_twitter: Attribute.String;
    social_facebook: Attribute.String;
    social_linkedin: Attribute.String;
    social_instagram: Attribute.String;
    social_youtube: Attribute.String;
    social_tiktok: Attribute.String;
    type: Attribute.Enumeration<['Customer', 'Partner', 'Vendor', 'Agent']>;
    documents: Attribute.Relation<
      'api::contact.contact',
      'oneToMany',
      'api::document.document'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentDocument extends Schema.CollectionType {
  collectionName: 'documents';
  info: {
    singularName: 'document';
    pluralName: 'documents';
    displayName: 'Document';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    document_name: Attribute.String;
    description: Attribute.Text;
    document_type: Attribute.Enumeration<
      [
        'INVOICE',
        '  RECEIPT',
        '  CONTRACT',
        '  OFFER',
        '  ID',
        '  PASSPORT',
        '  VISA',
        '  INSURANCE',
        '  HEALTH',
        '  CERTIFICATE',
        '  OTHER'
      ]
    >;
    visibility: Attribute.Enumeration<['Public', 'Private', 'Team']>;
    docFile: Attribute.Media;
    contact: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::contact.contact'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGlobalGlobal extends Schema.SingleType {
  collectionName: 'globals';
  info: {
    singularName: 'global';
    pluralName: 'globals';
    displayName: 'Global';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    header: Attribute.Component<'layout.header'>;
    footer: Attribute.Component<'layout.footer'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomePageHomePage extends Schema.SingleType {
  collectionName: 'home_pages';
  info: {
    singularName: 'home-page';
    pluralName: 'home-pages';
    displayName: 'Home Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    blocks: Attribute.DynamicZone<
      ['layout.hero-section', 'layout.features-section']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLeadLead extends Schema.CollectionType {
  collectionName: 'leads';
  info: {
    singularName: 'lead';
    pluralName: 'leads';
    displayName: 'Lead';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    firstName: Attribute.String;
    lastName: Attribute.String;
    company: Attribute.String;
    jobTitle: Attribute.String;
    email: Attribute.String;
    phone: Attribute.String;
    description: Attribute.Text;
    leadSource: Attribute.String;
    referredBy: Attribute.String;
    status: Attribute.Enumeration<['NEW', 'CONTACTED', 'QUALIFIED', 'LOST']>;
    type: Attribute.Enumeration<['VALUATION', 'DEMO']>;
    assigned_to: Attribute.Relation<
      'api::lead.lead',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    assigned_documents: Attribute.Relation<
      'api::lead.lead',
      'oneToMany',
      'api::document.document'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::lead.lead', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::lead.lead', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMyAccountMyAccount extends Schema.CollectionType {
  collectionName: 'my_accounts';
  info: {
    singularName: 'my-account';
    pluralName: 'my-accounts';
    displayName: 'MyAccount';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    company_name: Attribute.String;
    is_person: Attribute.Boolean & Attribute.DefaultTo<false>;
    email: Attribute.String;
    email_accountant: Attribute.String;
    phone_prefix: Attribute.String;
    phone: Attribute.String;
    mobile_prefix: Attribute.String;
    mobile: Attribute.String;
    fax_prefix: Attribute.String;
    fax: Attribute.String;
    website: Attribute.String;
    office_address: Attribute.Component<'components.address'>;
    billing_address: Attribute.Component<'components.address'>;
    VAT_number: Attribute.String;
    TAX_number: Attribute.String;
    bank_name: Attribute.String;
    bank_account: Attribute.String;
    bank_code: Attribute.String;
    bank_IBAN: Attribute.String;
    bank_SWIFT: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::my-account.my-account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::my-account.my-account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOpportunityOpportunity extends Schema.CollectionType {
  collectionName: 'opportunities';
  info: {
    singularName: 'opportunity';
    pluralName: 'opportunities';
    displayName: 'Opportunity';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    company: Attribute.Relation<
      'api::opportunity.opportunity',
      'manyToOne',
      'api::company.company'
    >;
    connected_contacts: Attribute.Relation<
      'api::opportunity.opportunity',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    budget: Attribute.Integer & Attribute.DefaultTo<0>;
    close_date: Attribute.Date;
    description: Attribute.Text;
    expected_revenue: Attribute.Integer;
    name: Attribute.String;
    documents: Attribute.Relation<
      'api::opportunity.opportunity',
      'oneToMany',
      'api::document.document'
    >;
    assigned_contact: Attribute.Relation<
      'api::opportunity.opportunity',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    status: Attribute.Enumeration<['ACTIVE', 'INACTIVE', 'PENDING', 'CLOSED']>;
    campaign: Attribute.Relation<
      'api::opportunity.opportunity',
      'manyToOne',
      'api::campaign.campaign'
    >;
    sales_stage: Attribute.Relation<
      'api::opportunity.opportunity',
      'manyToOne',
      'api::sales-stage.sales-stage'
    >;
    opportunity_type: Attribute.Relation<
      'api::opportunity.opportunity',
      'manyToOne',
      'api::opportunity-type.opportunity-type'
    >;
    assigned_contacts: Attribute.Relation<
      'api::opportunity.opportunity',
      'manyToMany',
      'api::contact.contact'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::opportunity.opportunity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::opportunity.opportunity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOpportunityTypeOpportunityType
  extends Schema.CollectionType {
  collectionName: 'opportunity_types';
  info: {
    singularName: 'opportunity-type';
    pluralName: 'opportunity-types';
    displayName: 'Opportunity Type';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    order: Attribute.Integer;
    opportunities: Attribute.Relation<
      'api::opportunity-type.opportunity-type',
      'oneToMany',
      'api::opportunity.opportunity'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::opportunity-type.opportunity-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::opportunity-type.opportunity-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    text: Attribute.Blocks &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    markdown: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post.post'
    >;
    locale: Attribute.String;
  };
}

export interface ApiSalesStageSalesStage extends Schema.CollectionType {
  collectionName: 'sales_stages';
  info: {
    singularName: 'sales-stage';
    pluralName: 'sales-stages';
    displayName: 'Sales Stage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    probability: Attribute.Integer;
    order: Attribute.Integer;
    opportunities: Attribute.Relation<
      'api::sales-stage.sales-stage',
      'oneToMany',
      'api::opportunity.opportunity'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sales-stage.sales-stage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sales-stage.sales-stage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSummarySummary extends Schema.CollectionType {
  collectionName: 'summaries';
  info: {
    singularName: 'summary';
    pluralName: 'summaries';
    displayName: 'Summary';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    videoId: Attribute.String;
    title: Attribute.String;
    summary: Attribute.RichText;
    user: Attribute.Relation<
      'api::summary.summary',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::summary.summary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::summary.summary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags';
  info: {
    singularName: 'tag';
    pluralName: 'tags';
    displayName: 'Tag';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    tagName: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTaskTask extends Schema.CollectionType {
  collectionName: 'tasks';
  info: {
    singularName: 'task';
    pluralName: 'tasks';
    displayName: 'Task';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: Attribute.Text;
    dueDateAt: Attribute.Date;
    position: Attribute.Integer;
    priority: Attribute.Enumeration<['URGENT', 'HIGH', 'MEDIUM', 'LOW']>;
    title: Attribute.String;
    assigned_user: Attribute.Relation<
      'api::task.task',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    status: Attribute.Enumeration<
      ['Active', 'Overdue', 'Complete', 'Cancelled']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::translate.batch-translate-job': PluginTranslateBatchTranslateJob;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::board.board': ApiBoardBoard;
      'api::campaign.campaign': ApiCampaignCampaign;
      'api::company.company': ApiCompanyCompany;
      'api::contact.contact': ApiContactContact;
      'api::document.document': ApiDocumentDocument;
      'api::global.global': ApiGlobalGlobal;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::lead.lead': ApiLeadLead;
      'api::my-account.my-account': ApiMyAccountMyAccount;
      'api::opportunity.opportunity': ApiOpportunityOpportunity;
      'api::opportunity-type.opportunity-type': ApiOpportunityTypeOpportunityType;
      'api::post.post': ApiPostPost;
      'api::sales-stage.sales-stage': ApiSalesStageSalesStage;
      'api::summary.summary': ApiSummarySummary;
      'api::tag.tag': ApiTagTag;
      'api::task.task': ApiTaskTask;
    }
  }
}
