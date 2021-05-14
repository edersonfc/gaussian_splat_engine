package com.mobiprojeto;

//13052021
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here

import com.facebook.react.ReactActivity;

//08102020
import android.content.Intent;
import android.content.res.Configuration;

//19102020
import com.rnfs.RNFSPackage;  // <--- import 

//28032021
import com.tkporter.sendsms.SendSMSPackage;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "mobiprojeto";
    // return "TelaSplash";
  }

//08102020
@Override
   public void onConfigurationChanged(Configuration newConfig) {
       super.onConfigurationChanged(newConfig);
       Intent intent = new Intent("onConfigurationChanged");
       intent.putExtra("newConfig", newConfig);
       this.sendBroadcast(intent);
   }



   //28032021
   @Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    //probably some other stuff here
    SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
}


}
