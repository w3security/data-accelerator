// *********************************************************************
// Copyright (c) Microsoft Corporation.  All rights reserved.
// Licensed under the MIT License
// *********************************************************************
namespace Flow.LiveDataService
{
    using Microsoft.AspNetCore.Hosting;
    using DataX.ServiceHost.AspNetCore;
    using DataX.ServiceHost.AspNetCore.Startup;
    using DataX.Contract.Settings;

    /// <summary>
    /// StartupFilter for Flow.LiveDataService
    /// </summary>
    public class FlowLiveDataServiceStartup : DataXServiceStartup
    {
        public FlowLiveDataServiceStartup() { }
        public FlowLiveDataServiceStartup(DataXSettings settings)
            : base(settings) { }
    }
}


