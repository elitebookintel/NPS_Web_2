﻿namespace Domain
{
    public enum EnErrorCode
    {
        Internal_error = -1,
        NoError = 0,
        Company_not_found = 1,
        User_name_or_password_is_incorrect = 2,
        Intsallation_platform_not_exist = 3,
        Application_not_available = 4,
        Installation_id_not_found = 5,
        Installation_id_not_valid = 6,
        APIKey_not_exist = 10,
        Insufficient_funds = 100,
        Recipient_is_not_registered = 101,
        User_name_not_found_or_incorrect_password = 102,
        User_Disabled = 103,
        User_already_exists = 104,
        Incorrect_refresh_token = 105,
        User_name_not_found_or_incorrect_Email = 106,
        Phone_number_already_used_from_another_user = 107,
        User_not_activated = 108,
        Invalid_activate_user_code = 109,
        User_not_exist = 110,
        Company_already_exists = 111,
        Company_data_is_incorrect = 112,
        Not_set_company = 113,
        Not_set_email = 114,
        Email_already_used = 115,
        Invalid_password_data = 116,
        Is_not_new_registration = 117,
        Invalid_token = 118,
        Invalid_old_password = 119,
        APP_not_exist = 120,
        MarketPackage_not_exist = 121,
        Aplication_already_exists = 122,
        Application_not_exist = 123,
        License_not_exist = 124,
        ISAuthService_not_accessible = 125,
        ISAuthService_not_result = 127,
        Invalid_Company_ID = 128,
        Invalid_Email = 129,
        Company_IDNO_already_exists = 130,
        HttpClient_error = 131,
        Invalid_license_activation_code = 132,
        Application_not_activate = 133,
        License_not_activated = 134,
        HTML_template_error = 135,
        HTML_template_empty = 136,
        Invalid_phone_number = 137,
        News_not_activate = 138,
        SMS_campaign_not_exist = 139,
        Invalid_external_security_policy_settings = 140,
        Invalid_KeyType = 141,
        Card_not_exist = 142,
        Expired_token = 143,
        Temporary_Key_does_not_exist = 144,
        Time_card_ID_expired = 145,
        Insufficient_amount_on_card = 146,
        The_amount_is_incorrect = 147,
        Transaction_not_exist = 148,
        Denied = 149,
        Allowed = 150,
        Accepted = 151,
        Duplicate_invoice = 152,
        Expired = 153,
        Failed = 154,
        Unknown = 155,
        Declined = 156,
        Approved = 157,
        Waiting = 158,
        The_status_cannot_be_applied = 159,
        Change_is_prohibited = 160,
        Duplicate_Phone = 161,
        License_unit_already_is_fiscal = 162,
        Invalid_ID = 163,
        Invalid_RSAKey = 164,
        Record_not_exist = 165,
        Bill_not_exist = 166,
        Card_with_that_number_exists = 167,
        Bill_already_exists = 168,
        Phone_list_not_exist = 169,
        Active_Directory_Organizational_unit_does_not_exist = 170,
        Active_Directory_Organizational_unit_already_exist = 171,
        The_APIkey_does_not_belong_to_the_company = 172,
        Active_Directory_Organizational_unit_not_exist = 173,
        Active_Directory_User_already_exist = 174,
        Invalid_format_datetime = 175,
        Invalid_Company_IDNO = 176,
        Mail_service_not_activated = 177,
        Access_denied = 178,
        Fiscal_Device_not_exist = 179,
        Fiscal_Device_not_activated = 180,
        Record_already_exist = 181,
        Contract_not_exist = 182,
        ApiKey_not_valid = 183,
        Mandatory_field_is_not_set = 184,
        Fiscal_Device_is_activated = 185,
        Invalid_receipt_ID = 186,
        Activation_code_not_exist = 187,
        SMS_campaign_set_Draft = 188,
        Tiket_not_exist = 189,
        Ticket_Reply_not_exist = 190,
        Tiket_File_not_exist = 191,
        Database_server_not_exist = 192,
        The_password_does_not_meet_the_password_policy_requirements = 193,
        Invalid_digital_signature = 194,
        Parent_record_not_exist = 195,
        Documentation_not_exist = 196,
        Service_not_exist = 197,
        Cannot_access_the_user_profile_disk_because_it_is_being_used_by_another_process = 198,
        Cannot_access_the_user_profile_directory = 199,
        Phone_already_used_another_client = 200,
        Client_not_exist = 201,
        Invalid_validation_code = 202,
        Card_not_is_active = 203,
        Variable_is_null_or_empty = 204,
        SMS_service_not_activated = 205,
        Not_set_phone_or_email = 206,
        Insufficient_funds_on_client_account = 207,
        The_client_card_has_no_own_account = 208,
        Record_was_used = 209,
        Invalid_receipt_date = 210,
        Active_Directory_not_response = 211,
        Record_not_Disabled = 212,
        Functionality_is_disabled = 213,
        Invalid_Wallet_ID = 214,
        Constraint_violation_exception = 215
    }
}
