package com.mobiprojeto;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
// import com.tkporter.sendsms.SendSMSPackage;
// import com.tkporter.sendsms.SendSMSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import ui.fileselector.RNFileSelectorPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.reactnative.camera.RNCameraPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

//11102020
import com.brentvatne.react.ReactVideoPackage;

//09082021
import com.shahenlibrary.RNVideoProcessingPackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

      /* DESATIVADO PARA ESSES COMANDO ABAIXO voltar caso erro  */
        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;



        }
        //DESATIVADO PARA ESSES COMANDO ACIMA voltar caso erro


        //28032021 DESCOMENTADO TODOS ITENS ABAIXO
 
        //  @Override
        //   protected List<ReactPackage> getPackages() {
        //       return Arrays.<ReactPackage>asList(
        //           new MainReactPackage(),
        //    new SvgPackage(),
        //     new ImageResizerPackage(),
        //     new ImageResizerPackage(),
        //     new SendSMSPackage(),
        //     new SendSMSPackage(),
        //     new ImageResizerPackage(),
        //     new ImageResizerPackage(),
        //     new RNFileSelectorPackage(),
        //     new ReactVideoPackage(),
        //           new OrientationPackage()     // <------- Add this
        //       );
        //   }
/**/
//28032021 DESCOMENTADO TODOS ITENS ACIMA



        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //13/11/2020 foi desativado
    //initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  /*  //13/11/2020 zica abaixo
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        
        Class<?> aClass = Class.forName("com.mobiprojeto.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
 
  */////13/11/2020 zica Acima
}
